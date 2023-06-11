from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class User(models.Model):
    name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/')


class GroupChat(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User)


class Message(models.Model):
    text = models.TextField()
    sender = models.ForeignKey('User', on_delete=models.CASCADE)
    group_chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(default=timezone.now)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message