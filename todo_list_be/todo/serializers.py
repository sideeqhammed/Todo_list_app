from rest_framework import serializers
from .models import Todo
from django.contrib.auth import get_user_model

class TodoSerializer(serializers.ModelSerializer):
  user = serializers.StringRelatedField(read_only = True)

  class Meta:
    model = Todo
    fields = '__all__'

User = get_user_model()
class UserCreateSerializer(serializers.ModelSerializer):  # how this part works
  password1 = serializers.CharField(write_only = True)
  password2 = serializers.CharField(write_only = True)

  def validate(self, attrs):
    if attrs['password1'] != attrs['password2']:
      raise serializers.ValidationError({
        'password': 'Passwords do not match'
      })
    password = attrs.get("password1", "")
    if len(password) < 8:
      raise serializers.ValidationError({
        'password': 'Password must be at least 8 characters'
      })
    return attrs

  def create(self, validated_data):
    validated_data.pop("password2")
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password1']
    )
    return user
  
  class Meta:
    model = User
    fields = ['username', 'email', 'password1', 'password2']