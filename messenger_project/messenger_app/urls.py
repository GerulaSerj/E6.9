from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('chat-list/', views.chat_list, name='chat-list'),
    path('create-chat/', views.create_chat, name='create-chat'),
    path('delete-chat/<int:chat_id>/', views.delete_chat, name='delete-chat'),
    path('edit-chat/<int:chat_id>/', views.edit_chat, name='edit-chat'),
    path('send-message/', views.send_message, name='send-message'),
    path('edit-message/<int:message_id>/', views.edit_message, name='edit-message'),
    path('delete-message/<int:message_id>/', views.delete_message, name='delete-message'),
    path('edit-profile/', views.edit_profile, name='edit-profile'),
    path('user-list/', views.user_list, name='user-list'),
    path('chat-view/', views.chat_view, name='chat-view'),
]