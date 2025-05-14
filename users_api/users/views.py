
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth.hashers import make_password, check_password  
from .models import UserAdd, Announcements, Room, Feedback, Question
from .serializers import UserSerializer, CreateUserSerializer, AnnouncementSerializer, RoomSerializer, FeedbackSerializer, QuestionSerializer
from .permissions import IsAdminOrReadOnly
from django.contrib.auth import authenticate
from django.utils.timezone import now
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken # type: ignore
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken # type: ignore
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.conf import settings
from datetime import datetime
from django.utils import timezone
import pytz # type: ignore
from django.db.models import F

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {"message": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:    
        user = UserAdd.objects.get(username=username)
        if check_password(password, user.password):
            # Generate tokens
            refresh = RefreshToken()
            refresh['user_id'] = user.account_id
            refresh['user_level'] = user.user_level
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Convert expiration times to Asia/Manila
            manila_tz = pytz.timezone('Asia/Manila')
            access_expires = datetime.fromtimestamp(refresh.access_token['exp'], tz=pytz.UTC).astimezone(manila_tz)
            refresh_expires = datetime.fromtimestamp(refresh['exp'], tz=pytz.UTC).astimezone(manila_tz)

            # Format expires in RFC 1123 format with timezone
            access_expires_str = access_expires.strftime('%a, %d %b %Y %H:%M:%S GMT%z')
            refresh_expires_str = refresh_expires.strftime('%a, %d %b %Y %H:%M:%S GMT%z')

            response = Response({
                "message": "Login successful",
                "user": {
                    "account_id": user.account_id,
                    "username": user.username,
                    "user_level": user.user_level,
                },
                "access": access_token,  
            }, status=status.HTTP_200_OK)

            # Pull config from SIMPLE_JWT
            cookie_name = settings.SIMPLE_JWT.get("AUTH_COOKIE", "access_token")
            cookie_secure = settings.SIMPLE_JWT.get("AUTH_COOKIE_SECURE", False)
            cookie_httponly = settings.SIMPLE_JWT.get("AUTH_COOKIE_HTTP_ONLY", True)
            cookie_samesite = settings.SIMPLE_JWT.get("AUTH_COOKIE_SAMESITE", "Lax")
            access_token_lifetime = int(settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds())
            refresh_token_lifetime = int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())

            # Set Access Token in Cookie
            response.set_cookie(
                key=cookie_name,
                value=access_token,
                httponly=cookie_httponly,
                secure=cookie_secure,
                samesite=cookie_samesite,
                path='/',
                max_age=access_token_lifetime,
                expires=access_expires_str
            )

            # Set Refresh Token in Cookie
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=cookie_httponly,
                secure=cookie_secure,
                samesite=cookie_samesite,
                path='/',
                max_age=refresh_token_lifetime,
                expires=refresh_expires_str
            )

            return response
        else:
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )
    except UserAdd.DoesNotExist:
        return Response(
            {"message": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    response = Response({'message': 'Logged out successfully'}, status=200)
    
    response.delete_cookie(
        'access_token',
        path='/',
        samesite='Lax'
    )
    response.delete_cookie(
        'refresh_token',
        path='/',
        samesite='Lax'
    )
    
    response.set_cookie(
        'access_token',
        '',
        expires=0,
        httponly=True,
        path='/',
        samesite='Lax'
    )
    response.set_cookie(
        'refresh_token',
        '',
        expires=0,
        httponly=True,
        path='/',
        samesite='Lax'
    )

    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token_view(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if not refresh_token:
        return Response({'error': 'No refresh token'}, status=401)

    try:
        cookie_secure = settings.SIMPLE_JWT.get("AUTH_COOKIE_SECURE", False)
        cookie_httponly = settings.SIMPLE_JWT.get("AUTH_COOKIE_HTTP_ONLY", True)
        cookie_samesite = settings.SIMPLE_JWT.get("AUTH_COOKIE_SAMESITE", "Lax")
        access_token_lifetime = int(settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds())

        refresh = RefreshToken(refresh_token)
        access = str(refresh.access_token)

        res = Response({'access': access}, status=200)
        res.set_cookie(
            'access_token',
            access,
            httponly=cookie_httponly,
            samesite=cookie_samesite,
            secure=cookie_secure,
            max_age=access_token_lifetime, # 👈 Make it persist
            path="/"
        )

        return res
    except Exception:
        return Response({'detail': 'Invalid refresh token'}, status=403)



@api_view(['GET'])
@permission_classes([AllowAny])
def protected_view(request):
    return Response({
        "authenticated": True,
        "user": request.user.username
    })


# List all users or create a new admin user
class UserList(generics.ListCreateAPIView):
    queryset = UserAdd.objects.all()  
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user_level='admin')


# Retrieve, update, or delete a specific admin user
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAdd.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly] 


# Retrieve all users (GET request)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_users(request):
    """
    Retrieve a list of all admin users.
    """
    users = UserAdd.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# Create a new admin user (POST request)
@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    """
    Create a new admin user.
    """
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def user_detail(request, pk):
    """
    Retrieve, update, or delete an admin user by their primary key.
    """
    try:
        user = UserAdd.objects.get(pk=pk)
    except UserAdd.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=False)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()  # Password hashing is handled by the serializer
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)  # Partial update
        if serializer.is_valid():
            serializer.save()  # Password hashing handled by serializer
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# ANNOUNCEMENT
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def announcement_list_create(request):
    # Auto-archive expired announcements
    Announcements.objects.filter(announcement_end_date__lt=now(), is_archived=False).update(is_archived=True)

    if request.method == 'GET':
        announcements = Announcements.objects.filter(is_archived=False)  # Only show active
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def announcement_detail(request, announcement_id):
    try:
        announcement = Announcements.objects.get(announcement_id=announcement_id)
    except Announcements.DoesNotExist:
        return Response({'error': 'Announcement not found'}, status=status.HTTP_404_NOT_FOUND)

    # Auto-archive if past end date
    if announcement.announcement_end_date and announcement.announcement_end_date < now():
        announcement.is_archived = True
        announcement.save()

    if request.method == 'GET':
        serializer = AnnouncementSerializer(announcement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method in ['PUT', 'PATCH']:
        serializer = AnnouncementSerializer(announcement, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#  List Archived Announcements
@api_view(['GET', 'DELETE'])
@permission_classes([AllowAny])
def archived_announcements(request):
    if request.method == 'GET':
        # List all archived announcements
        archived = Announcements.objects.filter(is_archived=True)
        serializer = AnnouncementSerializer(archived, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        # Delete all archived announcements
        try:
            archived = Announcements.objects.filter(is_archived=True)
            if not archived.exists():
                return Response({"message": "No archived announcements to delete"}, status=status.HTTP_200_OK)
            
            count = archived.count()
            archived.delete()
            return Response(
                {"message": f"Successfully deleted {count} archived announcement(s)"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def increment_announcement_views(request, pk):
    """
    POST /users/announcement/<id>/increment-views/
    Increments the view count for the specified announcement.
    """
    try:
        announcement = Announcements.objects.get(pk=pk)
        # Increment views using F() to avoid race conditions
        announcement.views = F('views') + 1
        announcement.save()
        # Refresh to get updated views value
        announcement.refresh_from_db()
        # Optional: Set cache for deduplication (uncomment to enable)
        # cache.set(cache_key, True, timeout=86400)  # 24 hours
        return Response({
            'success': True,
            'views': announcement.views
        }, status=status.HTTP_200_OK)
    except Announcements.DoesNotExist:
        return Response({
            'error': 'Announcement not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def top_announcements(request):
    """
    GET /users/announcement/top/
    Returns the top 4 non-archived announcements by view count.
    """
    announcements = Announcements.objects.filter(is_archived=False).order_by('-views')[:4]
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data)
        
@api_view(['GET'])
@permission_classes([AllowAny])
def list_rooms(request):
    """
    List all rooms.
    """
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([AllowAny])
def update_room(request, room_id):
    """
    Handle GET, PUT, and PATCH requests for a specific room.
    - GET: Retrieve the details of the room.
    - PUT: Fully updates the room instance (requires all fields).
    - PATCH: Partially updates the room instance (only provided fields are updated).
    """
    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({"detail": "Room not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Serialize the room data and return it
        serializer = RoomSerializer(room)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        # Partially update the room
        serializer = RoomSerializer(room, data=request.data, partial=True)
    else:
        # Fully update the room
        serializer = RoomSerializer(room, data=request.data)

    # Validate and save the updated data
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def feedback_create(request):
    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def feedback_list(request):
    feedbacks = Feedback.objects.all().prefetch_related('responses__question')
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def question_create(request):
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def question_list(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)