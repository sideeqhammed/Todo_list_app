from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
  path('login/', TokenObtainPairView.as_view(), name='login'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', views.UserCreateApiView.as_view(), name='user_create'),
  path('task/', views.TodoListCreateApiView.as_view(), name='todo_list'),
  path('task/<int:pk>/', views.TodoRetrieveUpdateDestroyApiView.as_view(), name='todo_detail'),
  path('profile/', views.UserProfileApiView.as_view(), name='user_profile'),
]