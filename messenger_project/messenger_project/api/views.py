from rest_framework.views import APIView
from rest_framework.response import Response
from messenger_app.models import User
from messenger_app.serializers import UserSerializer

class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)