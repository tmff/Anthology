from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import PoemSerializer,UserSerializer,RegisterSerializer, FriendsSerializer,HighlightSumbitSerializer,FriendRequestSerializer
from .models import Poem, Profile
from django.db.models import Q,F, FloatField, ExpressionWrapper, Max
import datetime
# Create your views here.



class PoemView(viewsets.ModelViewSet):
    serializer_class = PoemSerializer
    queryset = Poem.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        poem = Poem.objects.get(id=request.poem.id)
        serializer = PoemSerializer(poem,context={'request': request})
        return Response(serializer.data)


class FriendView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Profile.objects.all()#Doesnt this just return everyone lmao
    serializer_class = FriendsSerializer
    permission_classes = [IsAuthenticated]


class PoemFriendListView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = PoemSerializer
    model = Poem
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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

class SubmitHighlightPoem(APIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = HighlightSumbitSerializer
    permission_classes = [IsAuthenticated]

    def post(self,request):
        profile = Profile.objects.get(user=self.request.user.id)
        serializer = self.serializer_class(data=request.data)
        ##Check if user has voted today and return bad request if they have
        if profile.last_vote_time != None:
            if profile.last_vote_time.date() == datetime.date.today():
                return Response({'message':'already voted today'}, status=400)
        if serializer.is_valid():
            poem_id = serializer.validated_data['poem_id']
            poem = Poem.objects.get(id=poem_id)
            poem.matches_won += 1
            poem.matches_played += 1
            poem.save()

            losing_poem_id = serializer.validated_data['losing_id']
            losing_poem = Poem.objects.get(id=losing_poem_id)
            losing_poem.matches_played += 1
            losing_poem.save()

            profile.last_vote_time = datetime.datetime.now()
            profile.save()
            return Response({'message':'Vote cast!'},status=200)
        else:
            return Response(serializer.errors, status=400)

    def get(self,request):
        profile = Profile.objects.get(user=self.request.user.id)
        if profile.last_vote_time != None:
            if profile.last_vote_time.date() == datetime.date.today():
                return Response({'can_vote':'false'},status=200)
        return Response({'can_vote':'true'},status=200)




class HighlightedPoem(APIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = PoemSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        if not request.user.is_authenticated:
            return Response("User is not authenticated.", status=401)
        user = request.user
        profile = Profile.objects.get(user=user)
        friends = profile.friends.all()
        friends_users = [friend.user for friend in friends]
        today = datetime.date.today()
        try:
            queryset = Poem.objects.filter(time_created__date=today).filter(author__in=friends_users)
            print(len(queryset))
            highest_win_rate_poem = queryset.annotate(
            win_rate=ExpressionWrapper(
                F('matches_won') * 100 / F('matches_played'),
                output_field=FloatField()
            )
            ).order_by('-win_rate').first()
            return Response({'poem':highest_win_rate_poem.id},status=200)
        except:
           return Response({'poem':'null'},status=404)





class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class SendFriendRequestView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer

    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        from_user = request.user.profile
        to_user = validated_data['to_user']
        if from_user == to_user:
            return Response({'error': 'You cannot send a friend request to yourself.'}, status=400)
        if from_user.friends.filter(id=to_user.id).exists():
            return Response({'error': 'You are already friends with this user.'}, status=400)
        friend_request = FriendRequest(from_user=from_user, to_user=to_user, status='pending')
        friend_request.save()
        return Response({'status': 'Friend request sent.'}, status=201)
