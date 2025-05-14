from django.urls import path
# from rest_framework_simplejwt.views import TokenRefreshView
from .views import login_view, logout_view, refresh_token_view, protected_view, get_users, create_user, user_detail, announcement_detail, announcement_list_create, archived_announcements, update_room, list_rooms, UserList, UserDetail, feedback_create, feedback_list, question_create, question_list, increment_announcement_views, top_announcements


urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('refresh/', refresh_token_view),
    path('protected/', protected_view),

    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<int:pk>/', user_detail, name='user_detail'),
    path('users_view/', UserList.as_view(), name='user_list'),
    path('users_view/<int:pk>/', UserDetail.as_view(), name='user_detail_view'),
    path('announcement/' , announcement_list_create, name='announcement_list_create'),
    path('announcement/<int:announcement_id>/', announcement_detail, name='announcement_detail'),
    path('announcement/archived/', archived_announcements, name='archived-announcements'),
    path('announcement/<int:pk>/increment-views/', increment_announcement_views, name='increment-announcement-views'),
    path('announcement/top/', top_announcements, name='top-announcements'),
    path('room/update/<int:room_id>/', update_room, name='update_room'),
    path('room/list/', list_rooms, name='list_rooms'),
    path('feedback/create/', feedback_create, name='feedback_create'),
    path('feedback/list/', feedback_list, name='feedback_list'),
    path('question/create/', question_create, name='question_create'),
    path('question/list/', question_list, name='question_list'),
]