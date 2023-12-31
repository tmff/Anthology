from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from .models import Poem, Profile, FriendRequest
from django.db.models import Q, F, FloatField, ExpressionWrapper, Max
import datetime
import io
# Create your views here.


class PoemView(viewsets.ModelViewSet):
    serializer_class = PoemSerializer
    queryset = Poem.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        poem = Poem.objects.get(id=request.poem.id)
        serializer = PoemSerializer(poem, context={'request': request})
        return Response(serializer.data)


class FriendView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Profile.objects.all()#Doesnt this just return everyone lmao
    serializer_class = FriendsSerializer
    permission_classes = [IsAuthenticated]

    # def get(self, request, *args, **kwargs):
    #     profile = Profile.objects.get(user=self.request.user.id)
    #     # serializer = FriendsSerializer(profile, context={'request': request})
    #     friends = profile.friends.count()
    #     return friends

class ReadingRoomPoemView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = PoemSerializer

    def get_queryset(self, *args, **kwargs):

        #Get today's date and theme
        today = datetime.date.today()

        #Get public users
        public_profiles = Poem.objects.filter(
            Q(author__profile__is_private=False) | 
            Q(author__profile__is_private__isnull=True)
        )
        try:
            #Get popular poems of today's theme
            popular_poems = Poem.objects.filter(theme__date_created__date=today).annotate(
                win_rate=ExpressionWrapper(
                    F('matches_won') * 100 / F('matches_played'),
                    output_field=FloatField()
                )
            ).order_by('-win_rate')[:10] #top 10 popular poems today

            #Get other poems from today's theme
            non_popular_poems = Poem.objects.filter(theme__date_created__date=today).exclude(id=popular_poem.id)

            #Get all previous themes, excluding today
            prev_themes = Theme.objects.exclude(date_created__date=today)
        except Poem.DoesNotExist:
            popular_poems = None
            non_popular_poems = None
            prev_themes = None

        queryset = {
            'public_profiles' : public_profiles,
            'popular_poems': popular_poems,
            'non_popular_poems': non_popular_poems,
            'prev_themes': prev_themes,
        }
        return queryset
        
    def get(self, request):
        queryset = self.get_queryset()
        
        # Serialize the data and return the response
        data = {
            'popular_poems': PoemSerializer(queryset['popular_poems'], many=True).data,
            'non_popular_poems': PoemSerializer(queryset['non_popular_poems'], many=True).data,
            'prev_themes': ThemeSerializer(queryset['prev_themes'], many=True).data,
            'public_profiles': PublicProfileSerializer(queryset['public_profiles'], many=True).data,
            }
    
        return Response(data, status=200)


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
    authentication_classes = [TokenAuthentication,]
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

    def post(self, request):
        profile = Profile.objects.get(user=self.request.user.id)
        serializer = self.serializer_class(data=request.data)
        # Check if user has voted today and return bad request if they have
        if profile.last_vote_time is not None:
            if profile.last_vote_time.date() == datetime.date.today():
                return Response({'message': 'already voted today'}, status=400)
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
            return Response({'message': 'Vote cast!'}, status=200)
        else:
            return Response(serializer.errors, status=400)

    def get(self, request):
        profile = Profile.objects.get(user=self.request.user.id)
        if profile.last_vote_time is not None:
            if profile.last_vote_time.date() == datetime.date.today():
                return Response({'can_vote': 'false'}, status=200)
        return Response({'can_vote': 'true'}, status=200)


class HighlightedPoem(APIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = PoemSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
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
            return Response({'poem': highest_win_rate_poem.id}, status=200)
        except:
            return Response({'poem': 'null'}, status=200)


class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class SendFriendRequestView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = CreateFriendRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        from_user = request.user.profile
        to_user_str = validated_data['to_user']

        try:
            user = User.objects.get(username=to_user_str)
            to_user = Profile.objects.get(user=user)

            queryset = FriendRequest.objects.filter(from_user=from_user)
            queryset = queryset.filter(to_user=user.profile)
            if queryset.exists():
                return Response({'error': 'You have already sent a friend request to this user.'}, status=400)
            
        except:
            return Response({'error': 'User cannot be found.'}, status=400)
        if from_user == to_user:
            return Response({'error': 'You cannot send a friend request to yourself.'}, status=400)
        if from_user.friends.filter(id=to_user.id).exists():
            return Response({'error': 'You are already friends with this user.'}, status=400)
        friend_request = FriendRequest(from_user=from_user, to_user=to_user, status='pending')
        friend_request.save()
        return Response({'status': 'Friend request sent.'}, status=201)


class PendingRequestView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer

    def get_queryset(self, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        try:
            queryset = FriendRequest.objects.filter(to_user=profile).filter(status='pending')
            return queryset
        except:
            return FriendRequest.objects.none()


class PendingRequestResponseView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = RespondFriendRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            profile = Profile.objects.get(user=self.request.user.id)
            friend_request_id = serializer.validated_data['id']
            friend_request = FriendRequest.objects.get(id=friend_request_id)
            if friend_request.to_user != profile:
                return Response({'error': 'You do not have permission to respond to this request.'}, status=400)
            if friend_request.status != 'pending':
                return Response({'error': 'This request has already been responded to.'}, status=400)
            response = serializer.validated_data['status']
            if response == 'accepted':
                friend_request.status = 'accepted'
                friend_request.save()
                profile.friends.add(friend_request.from_user)
                profile.save()
                friend_request.from_user.friends.add(profile)
                friend_request.from_user.save()
                return Response({'status': 'Friend request accepted.'}, status=200)
            elif response == 'declined':
                friend_request.status = 'declined'
                friend_request.save()
                return Response({'status': 'Friend request declined.'}, status=200)
            else:
                return Response({'error': 'Invalid response.'}, status=400)
        else:
            return Response(serializer.errors, status=400)


class LikePoemView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):

        # Find the poem
        if request.data['poem_id'] is None:
            return Response({'error': 'A poem ID must be specified.'}, status=400)

        poem = Poem.objects.get(id=request.data['poem_id'])
        if not poem:
            return Response({'error': 'Poem not found.'}, status=400)

        like = Like(poem=poem, user=request.user)
        like.save()
        return Response({'status': 'Like made.', 'likes': poem.get_like_count()}, status=200)


class UnlikePoemView(generics.DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        # Find the poem
        if request.data['poem_id'] is None:
            return Response({'error': 'A poem ID must be specified.'}, status=400)

        poem = Poem.objects.get(id=request.data['poem_id'])
        if not poem:
            return Response({'error': 'Poem not found.'}, status=400)

        like = Like.objects.filter(user=request.user, poem=poem)
        if not like:
            return Response({'error': 'The poem is not liked.'}, status=400)

        like.delete()
        return Response({'status': 'Like removed.', 'likes': poem.get_like_count()}, status=200)


class CommentPoemView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):

        # Get the content
        if not exists(request.data, 'comment'):
            return Response({'error': 'Comment content should be specified.'}, status=400)

        # Find the poem
        if not exists(request.data, 'poem_id'):
            return Response({'error': 'A poem ID must be specified.'}, status=400)

        poem = Poem.objects.get(id=request.data['poem_id'])
        if not poem:
            return Response({'error': 'Poem not found.'}, status=400)

        commentStr = request.data['comment']

        if commentStr.strip() == "":
            return Response({'status': 'Comment content must not be empty.'}, status=400)

        comment = Comment(poem=poem, user=request.user, content=commentStr)
        comment.save()

        return Response({'author': request.user.username, 'comment': commentStr}, status=200)


class BookmarkPoemView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = BookmarkSerializer
    
    def create(self, request, *args, **kwargs):

        # Get the poem ID
        if not exists(request.data, 'poem_id'):
            return Response({'error': 'A poem ID must be specified.'}, status=400)
        
        poem = Poem.objects.get(id=request.data['poem_id'])
        if not poem:
            return Response({'error': 'Poem not found.'}, status=400)
        
        bookmark = Bookmark(poem=poem, user=request.user)
        bookmark.save()

        return Response(status=204)


class RemoveBookmarkPoemView(generics.DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        # Find the poem
        if not exists(request.data, 'poem_id'):
            return Response({'error': 'A poem ID must be specified.'}, status=400)

        poem = Poem.objects.get(id=request.data['poem_id'])
        if not poem:
            return Response({'error': 'Poem not found.'}, status=400)
        
        bookmark = Bookmark.objects.filter(poem=poem, user=request.user)
        if not bookmark:
            return Response({'error': 'Poem not bookmarked.'}, status=400)
        
        bookmark.delete()
        return Response(status=204)


class FetchBookmarkedPoemsView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = BookmarkSerializer
    model = Bookmark
    queryset = Bookmark.objects.all()

    def get(self, *args, **kwargs):

        # Find the bookmarks
        bookmarks = Bookmark.objects.filter(user=self.request.user)
        return bookmarks


class FetchCommentsPoemView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    model = Comment
    queryset = Comment.objects.all()

    def get(self, *args, **kwargs):

        # Find the poem
        comments = Comment.objects.filter(poem__id=kwargs.get("poem_id"))
        return comments


class EditProfileView(APIView):
    serializer_class = ProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def post (self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        print("inside post")
        print(request.data)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EditPictureView(APIView):
    serializer_class = ImageSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        serializer = ImageSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)

        serializer = ImageSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditModeView(APIView):
    serializer_class = ModeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)
        serializer = ModeSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user.id)

        serializer = ModeSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaggedPoemViewSet(viewsets.ModelViewSet):
    queryset = Poem.objects.all()
    serializer_class = SearchPoemSerializer

    def get_queryset(self):
        qs = Poem.objects.all()
        tags = self.request.query_params.get('tags.title') 
        if tags is not None:
            qs = qs.filter(tags__title__icontains=tags)
        return qs


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        qs = User.objects.all()
        username = self.request.query_params.get('username') 
        if username is not None:
            qs = qs.filter(username__icontains=username)
        return qs


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Poem.objects.all()
    serializer_class = SearchPoemSerializer

    def get_queryset(self):
        qs = Poem.objects.all()
        title = self.request.query_params.get('title') 
        if title is not None:
            qs = qs.filter(title__icontains=title)
        return qs


def exists(dict, key):
    try:
        dict[key]
        return True
    except KeyError:
        return False
