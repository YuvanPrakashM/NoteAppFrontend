import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import RegisterSerializer, UserSerializer
from .models import CustomUser
from rest_framework.views import APIView
import datetime

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("user_email")
        password = request.data.get("password")
        user = authenticate(user_email=email, password=password)

        if user:
            payload = {
                "user_id": str(user.user_id),
                "user_email": user.user_email,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS)
            }
            token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
            return Response({"token": token, "user_name": user.user_name, "user_email": user.user_email})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "user_id": str(request.user.user_id),
            "user_name": request.user.user_name,
            "user_email": request.user.user_email,
            "create_on": request.user.create_on,
            "last_updated": request.user.last_updated
        })
