from django.urls import path
from messenger_app..views import UserListAPIView

urlpatterns = [
    path('users/', UserListAPIView.as_view(), name='user-list'),
]