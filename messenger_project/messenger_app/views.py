from rest_framework import viewsets
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from .models import User, GroupChat, Message
from .serializers import UserSerializer, GroupChatSerializer, MessageSerializer
from .models import Notification
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupChatViewSet(viewsets.ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

def home(request):
    return render(request, 'home.html')

def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            notification_message = "Добро пожаловать, {username}! Вы успешно зарегистрировались.".format(username=user.username)
            notification = Notification(user=user, message=notification_message)
            notification.save()
            return redirect('home')
    else:
        form = UserCreationForm()

    return render(request, 'registration_form.html', {'form': form})

def index(request):
    # Обработка запроса на вход пользователя
    if request.method == 'POST':
        username = request.POST.get('username')
        avatar = request.FILES.get('avatar')
        if username and avatar:
            # Создайте нового пользователя с указанным именем и аватаром
            user = User(name=username, avatar=avatar)
            user.save()

            # Выполните аутентификацию пользователя и установите его сеанс
            user = authenticate(username=username, password=None)
            login(request, user)

            return redirect('chat-list')  # Перенаправьте пользователя на страницу chat.html

    return render(request, 'index.html')

def messages(request):
    return HttpResponse("This is the messages page")

@login_required
def notifications(request):
    user = request.user
    notifications = Notification.objects.filter(user=user).order_by('-created_at')
    return render(request, 'notifications.html', {'notifications': notifications})
@login_required
def chat_list(request):
    chats = GroupChat.objects.all()
    return render(request, 'chat.html', {'chats': chats})

def login(request):
    # Обработка запроса на вход пользователя
    if request.method == 'POST':
        username = request.POST.get('username')
        avatar = request.FILES.get('avatar')
        if username and avatar:
            # Создайте нового пользователя с указанным именем и аватаром
            user = User(name=username, avatar=avatar)
            user.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid login credentials'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

def create_chat(request):
    if request.method == 'POST':
        chat_name = request.POST.get('chat_name')
        user_ids = request.POST.getlist('users')
        if chat_name and user_ids:
            # Создайте новый групповой чат с указанным названием и участниками
            chat = GroupChat(name=chat_name)
            chat.save()
            chat.members.set(user_ids)
            chat.save()
            return redirect('chat-list')
    return render(request, 'create_chat.html', {'users': User.objects.all()})

def delete_chat(request, chat_id):
    chat = GroupChat.objects.get(pk=chat_id)
    chat.delete()
    return JsonResponse({'success': True})

def edit_chat(request, chat_id):
    chat = GroupChat.objects.get(pk=chat_id)
    if request.method == 'POST':
        chat_name = request.POST.get('chat_name')
        user_ids = request.POST.getlist('users')
        if chat_name and user_ids:
            # Обновите название и участников группового чата
            chat.name = chat_name
            chat.members.set(user_ids)
            chat.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid data'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

def delete_group_chat(request, chat_id):
    if not user_logged_in(request):
        return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

    # Реализуйте логику удаления группового чата

def send_message(request):
    if request.method == 'POST':
        sender_id = request.POST.get('sender')
        chat_id = request.POST.get('chat')
        message_text = request.POST.get('message_text')
        if sender_id and chat_id and message_text:
            # Создайте новое сообщение и свяжите его с отправителем и групповым чатом
            message = Message(text=message_text, sender_id=sender_id, group_chat_id=chat_id)
            message.save()
            return redirect('chat-list')
    return render(request, 'send_message.html', {'users': User.objects.all(), 'chats': GroupChat.objects.all()})

def edit_message(request, message_id):
    message = Message.objects.get(pk=message_id)
    if request.method == 'POST':
        message_text = request.POST.get('message_text')
        if message_text:
            # Обновите текст сообщения
            message.text = message_text
            message.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid data'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

def delete_message(request, message_id):
    message = Message.objects.get(pk=message_id)
    message.delete()
    return JsonResponse({'success': True})

def edit_profile(request):
    user = User.objects.first()  # Здесь можно использовать логику для выбора текущего пользователя
    if request.method == 'POST':
        user.name = request.POST.get('username')
        user.avatar = request.FILES.get('avatar')
        user.save()
        return redirect('user-list')
    return render(request, 'edit_profile.html', {'user': user})

def user_list(request):
    users = User.objects.all()
    return render(request, 'users.html', {'users': users})

def chat_list(request):
    chats = GroupChat.objects.all()
    return render(request, 'chat.html', {'chats': chats})

def chat_view(request):
    return render(request, 'chat.html')