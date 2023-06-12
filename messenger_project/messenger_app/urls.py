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
    path('login/', views.login, name='login'),
    path('create-group-chat/', views.create_group_chat, name='create-group-chat'),
    path('edit-group-chat/<int:chat_id>/', views.edit_group_chat, name='edit-group-chat'),
    path('delete-group-chat/<int:chat_id>/', views.delete_group_chat, name='delete-group-chat'),
    path('send-message/', views.send_message, name='send-message'),
    path('edit-user-info/', views.edit_user_info, name='edit-user-info'),
    path('user-list/', views.get_user_list, name='get-user-list'),
    path('chat-list/', views.chat_list, name='get-chat-list'),
]