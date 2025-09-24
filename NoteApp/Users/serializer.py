from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ['user_id', 'user_name', 'user_email', 'password']

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            user_email=validated_data['user_email'],
            user_name=validated_data['user_name'],
            password=validated_data['password']
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['user_id', 'user_name', 'user_email', 'create_on', 'last_updated']
        read_only_fields = ['user_id', 'create_on', 'last_updated']

class LoginSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            user_email=attrs.get('user_email'), 
            password=attrs.get('password')
        )
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {'user': user}
