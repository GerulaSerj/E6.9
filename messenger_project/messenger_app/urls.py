from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('chat/', views.chat_view, name='chat-list'),
    path('users/', views.users, name='users'),
    path('chatrooms/', views.chatrooms, name='chatrooms'),
    path('create_chat/', views.create_chat, name='create_chat'),
    path('send_message/', views.send_message, name='send_message'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('edit_chat/<int:chat_id>/', views.edit_chat, name='edit_chat'),
    path('delete_chat/<int:chat_id>/', views.delete_chat, name='delete_chat'),
    path('edit_message/<int:message_id>/', views.edit_message, name='edit_message'),
    path('delete_message/<int:message_id>/', views.delete_message, name='delete_message'),
]