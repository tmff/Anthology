from django.shortcuts import render


from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from .serializers import PoemSerializer,UserSerializer,RegisterSerializer
from .models import Poem
# Create your views here.



class PoemView(viewsets.ModelViewSet):
    serializer_class = PoemSerializer
    queryset = Poem.objects.all()
    def get(self, request, *args, **kwargs):
        poem = Poem.objects.get(id=request.poem.id)
        serializer = PoemSerializer(poem)
        return Response(serializer.data)


class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


