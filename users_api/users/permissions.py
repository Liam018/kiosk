from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to allow only admin users to edit, but allow read access for others.
    """
    def has_permission(self, request, view):
        # Allow read access for safe methods
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Allow write access for users with user_level='admin'
        if request.user and hasattr(request.user, 'user_level') and request.user.user_level.lower() == 'admin':
            return True
        return False