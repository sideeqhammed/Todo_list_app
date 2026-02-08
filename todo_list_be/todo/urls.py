from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
  path('login/', TokenObtainPairView.as_view(), name='login'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', views.UserCreateApiView.as_view(), name='user_create'),
  path('todo/', views.TodoListCreateApiView.as_view(), name='todo_list'),
  path('todo/<int:pk>', views.TodoRetrieveUpdateDestroyApiView.as_view(), name='todo_detail'),
]