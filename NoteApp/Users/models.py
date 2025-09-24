from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, user_email, user_name, password=None):
        if not user_email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(user_email)
        user = self.model(user_email=email, user_name=user_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_email, user_name, password):
        user = self.create_user(user_email, user_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name = models.CharField(max_length=255)
    user_email = models.EmailField(unique=True)
    create_on = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "user_email"
    REQUIRED_FIELDS = ["user_name"]

    def __str__(self):
        return self.user_email
