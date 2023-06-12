from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/', views.users, name='users'),
    path('chatrooms/', views.chatrooms, name='chatrooms'),
    path('create_chat/', views.create_chat, name='create_chat'),
    path('send_message/', views.send_message, name='send_message'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
]