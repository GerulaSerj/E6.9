from django.urls import path
from . import views

urlpatterns = [
    # URL-маршруты для работы с моделями данных
    path('api/users/', views.UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('users/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-list'),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-detail'),
    path('group-chats/', views.GroupChatViewSet.as_view({'get': 'list', 'post': 'create'}), name='groupchat-list'),
    path('group-chats/<int:pk>/', views.GroupChatViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='groupchat-detail'),
    path('messages/', views.MessageViewSet.as_view({'get': 'list', 'post': 'create'}), name='message-list'),
    path('messages/<int:pk>/', views.MessageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='message-detail'),
]