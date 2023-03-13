from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from .serializers import PoemSerializer,UserSerializer,RegisterSerializer, FriendsSerializer
from .models import Poem, Profile
from django.db.models import Q
import datetime
# Create your views here.



class PoemView(viewsets.ModelViewSet):
    serializer_class = PoemSerializer
    queryset = Poem.objects.all()
    authentication_classes = (TokenAuthentication,)
    def get(self, request, *args, **kwargs):
        poem = Poem.objects.get(id=request.poem.id)
        serializer = PoemSerializer(poem,context={'request': request})
        return Response(serializer.data)


class FriendView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Profile.objects.all()
    serializer_class = FriendsSerializer


class PoemFriendListView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = PoemSerializer
    model = Poem

    def get_queryset(self, *args, **kwargs):
        
        # Get the profile of the user and their friends
        profile = Profile.objects.get(user=self.request.user.id)
        friends = profile.friends.all()
        friends_users = [friend.user for friend in friends]

        # Get all poems ordered by created date
        try:
            queryset = Poem.objects.filter(author__in=friends_users).order_by('time_created')[0:20]
        except Poem.DoesNotExist:
            return Poem.objects.none()
        
        # Serialize all of the poems
        return queryset

class HighlightChoiceView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = PoemSerializer
    model = Poem

    def get_queryset(self, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        friends = profile.friends.all()
        friends_users = [friend.user for friend in friends]
        today = datetime.date.today()
        try:
            queryset = Poem.objects.filter(
                Q(author__profile__is_private=False) | 
                Q(author__profile__is_private__isnull=True)
            )
            queryset = queryset.filter(time_created__date=today).exclude(author__in=friends_users)
            queryset = queryset.order_by('?')[:2]
        except:
            return Poem.objects.none()

        return queryset



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



