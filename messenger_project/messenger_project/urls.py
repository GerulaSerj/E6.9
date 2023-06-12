from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from messenger_app import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'group-chats', views.GroupChatViewSet)
router.register(r'messages', views.MessageViewSet)


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('', views.messages, name='messages'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('registration/', views.registration, name='registration'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)