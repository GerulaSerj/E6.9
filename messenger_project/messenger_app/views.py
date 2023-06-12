from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .models import User, GroupChat, Message
from .serializers import UserSerializer, GroupChatSerializer, MessageSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupChatViewSet(viewsets.ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

def index(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        avatar = request.FILES.get('avatar')
        if username:
            user = User(name=username, avatar=avatar)
            user.save()
            user = authenticate(username=username, password=None)
            login(request, user)
            return redirect('chat-list')

    return render(request, 'index.html')

@login_required
def chat_list(request):
    chats = GroupChat.objects.all()
    return render(request, 'chat.html', {'chats': chats})

def create_chat(request):
    if request.method == 'POST':
        chat_name = request.POST.get('chat_name')
        user_ids = request.POST.getlist('users')
        if chat_name and user_ids:
            chat = GroupChat(name=chat_name)
            chat.save()
            chat.members.set(user_ids)
            chat.save()
            return redirect('chat-list')

    return render(request, 'create_chat.html', {'users': User.objects.all()})

def delete_chat(request, chat_id):
    chat = GroupChat.objects.get(pk=chat_id)
    chat.delete()
    return redirect('chat-list')

def edit_chat(request, chat_id):
    chat = GroupChat.objects.get(pk=chat_id)
    if request.method == 'POST':
        chat_name = request.POST.get('chat_name')
        user_ids = request.POST.getlist('users')
        if chat_name and user_ids:
            chat.name = chat_name
            chat.members.set(user_ids)
            chat.save()
            return redirect('chat-list')

    return render(request, 'edit_chat.html', {'chat': chat, 'users': User.objects.all()})

def send_message(request):
    if request.method == 'POST':
        sender_id = request.POST.get('sender')
        chat_id = request.POST.get('chat')
        message_text = request.POST.get('message_text')
        if sender_id and chat_id and message_text:
            message = Message(text=message_text, sender_id=sender_id, group_chat_id=chat_id)
            message.save()
            return redirect('chat-list')

    return render(request, 'send_message.html', {'users': User.objects.all(), 'chats': GroupChat.objects.all()})

def edit_message(request, message_id):
    message = Message.objects.get(pk=message_id)
    if request.method == 'POST':
        message_text = request.POST.get('message_text')
        if message_text:
            message.text = message_text
            message.save()
            return redirect('chat-list')

    return render(request, 'edit_message.html', {'message': message})

def delete_message(request, message_id):
    message = Message.objects.get(pk=message_id)
    message.delete()
    return redirect('chat-list')

def edit_profile(request):
    user = User.objects.first()  # You can implement the logic to get the current user here
    if request.method == 'POST':
        user.name = request.POST.get('username')
        user.avatar = request.FILES.get('avatar')
        user.save()
        return redirect('user-list')

    return render(request, 'edit_profile.html', {'user': user})

def user_list(request):
    users = User.objects.all()
    return render(request, 'users.html', {'users': users})

def chat_view(request):
    if request.method == 'GET':
        return render(request, 'chat.html')
    else:
        return HttpResponse(status=405)