from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
  email = models.EmailField(unique=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def __str__(self):
    return(f'{self.username}')

class Todo(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todos')
  title = models.CharField(max_length=50)
  completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
