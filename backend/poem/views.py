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
    authentication_classes = (TokenAuthentication,)
    def get(self, request, *args, **kwargs):
        poem = Poem.objects.get(id=request.poem.id)
        serializer = PoemSerializer(poem,context={'request': request})
        return Response(serializer.data)


class PoemFriendListView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        
        # Get the profile of the user and their friends
        profile = Profile.objects.get(user=request.user)
        friends = profile.friends

        # Get all poems ordered by created date
        poems = Poem.objects.filter(author__in=friends).order_by('time_created')[0:20].get()
        
        # Serialize all of the poems
        serialized = [PoemSerializer(poem, context={'request': request}).data for poem in poems]
        return Response(serialized)


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



