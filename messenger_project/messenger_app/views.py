from rest_framework import viewsets
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .models import User, GroupChat, Message
from .serializers import UserSerializer, GroupChatSerializer, MessageSerializer
from .models import Notification
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

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


from django.shortcuts import render


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
    return render(request, 'index.html')

def messages(request):
    return HttpResponse("This is the messages page")

@login_required
def notifications(request):
    user = request.user
    notifications = Notification.objects.filter(user=user).order_by('-created_at')
    return render(request, 'notifications.html', {'notifications': notifications})

def login(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    avatar = request.POST.get('avatar')

    if username and avatar:
      # Сохраните информацию о пользователе (например, в сессии или базе данных)

      # Разрешите доступ к функционалу создания, редактирования и удаления групповых чатов
      # и отправки сообщений

      return JsonResponse({'message': 'Login successful'})

  return JsonResponse({'error': 'Invalid request'})

def create_group_chat(request):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику создания группового чата

def edit_group_chat(request, chat_id):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику редактирования группового чата

def delete_group_chat(request, chat_id):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику удаления группового чата

def send_message(request):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику отправки сообщения

def edit_user_info(request):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику редактирования информации о пользователе

def get_user_list(request):
  if not user_logged_in(request):
    return JsonResponse({'error': 'Please login first'})  # Верните ошибку, если пользователь не вошел

  # Реализуйте логику получения списка других пользователей