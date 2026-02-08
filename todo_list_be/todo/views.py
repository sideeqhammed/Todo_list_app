from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Todo
from .serializers import TodoSerializer, UserCreateSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsOwner
from rest_framework.filters import SearchFilter, OrderingFilter
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()
class UserCreateApiView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserCreateSerializer
  permission_classes = [AllowAny]

class TodoListCreateApiView(ListCreateAPIView):
  serializer_class = TodoSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Todo.objects.filter(user = self.request.user)

  filter_backends = [SearchFilter, OrderingFilter]
  search_fields = ['title']
  ordering_fields = ['created_at']

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
    return super().perform_create(serializer)

class TodoRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer
  permission_classes = [IsAuthenticated, IsOwner]