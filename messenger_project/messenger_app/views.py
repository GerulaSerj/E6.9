from rest_framework import viewsets
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .models import User, GroupChat, Message
from .serializers import UserSerializer, GroupChatSerializer, MessageSerializer
from .models import Notification
from django.contrib.auth.decorators import login_required

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

@login_required
def notifications(request):
    user = request.user
    notifications = Notification.objects.filter(user=user).order_by('-created_at')
    return render(request, 'notifications.html', {'notifications': notifications})