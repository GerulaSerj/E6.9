from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import User, GroupChat, Message

@login_required
def chat_list(request):
    chats = GroupChat.objects.all()
    users = User.objects.all()
    return render(request, 'chat_list.html', {'chats': chats, 'users': users})

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

    users = User.objects.all()
    return render(request, 'create_chat.html', {'users': users})

def message_user(request):
    if request.method == 'POST':
        recipient_id = request.POST.get('recipient')
        message_text = request.POST.get('message_text')
        if recipient_id and message_text:
            message = Message(text=message_text, sender=request.user, recipient_id=recipient_id)
            message.save()
            return redirect('chat-list')

    users = User.objects.all()
    return render(request, 'message_user.html', {'users': users})

def edit_profile(request):
    user = request.user
    if request.method == 'POST':
        user.name = request.POST.get('username')
        user.avatar = request.FILES.get('avatar')
        user.save()
        return redirect('user-list')

    return render(request, 'edit_profile.html', {'user': user})

def chat_view(request, chat_id):
    chat = GroupChat.objects.get(pk=chat_id)
    messages = Message.objects.filter(group_chat=chat)
    return render(request, 'chat.html', {'chat': chat, 'messages': messages})