from rest_framework import authentication, exceptions
import jwt
from django.conf import settings
from .models import CustomUser

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        try:
            prefix, token = auth_header.split(" ")
            if prefix.lower() != "bearer":
                return None
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
            user = CustomUser.objects.get(user_id=payload["user_id"])
            return (user, token)
        except (jwt.ExpiredSignatureError, jwt.DecodeError, CustomUser.DoesNotExist):
            raise exceptions.AuthenticationFailed("Invalid or expired token")
