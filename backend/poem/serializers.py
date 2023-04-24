from rest_framework import serializers, generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Comment, Poem, Profile, Like, Bookmark, FriendRequest, Tag
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username']


class PoemSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Poem
        fields = ('id', 'title', 'content', 'author', 'is_liked', 'like_count', 'is_bookmarked', 'comment_count')

    def get_is_liked(self, poem):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if not user:
            return False

        try:
            result = Like.objects.get(poem=poem, user=user)
            return True
        except Like.DoesNotExist:
            return False

    def get_like_count(self, poem):
        return poem.get_like_count()

    def get_is_bookmarked(self, poem):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if not user:
            return False
        
        try:
            result = Bookmark.objects.get(poem=poem, user=user)
            return True
        except Bookmark.DoesNotExist:
            return False
   
    def get_comment_count(self, poem):
        return poem.get_comment_count()

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        poem = Poem(
            title=validated_data['title'],
            content=validated_data['content'],
            author=user,
        )
        poem.save()
        return poem


class HighlightSumbitSerializer(serializers.Serializer):
    poem_id = serializers.IntegerField()
    losing_id = serializers.IntegerField()


class RegisterSerializer(serializers.ModelSerializer):

    # Email field
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    # The chosen password
    password = serializers.CharField(
        write_only=True,
        required=True, validators=[validate_password],
        style={'input_type': 'password', 'placeholder': 'Password'},
    )

    # Repeating the password
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', 'placeholder': 'Confirm Password'},)

    # The metadata for the serializer
    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {'first_name': {'required': True}, 'last_name': {'required': True}}

    # Validate the password
    def clean(self):
        cleaned_data = super(RegisterSerializer, self).clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")

        if (password != password2):
            raise serializers.ValidationError("Your passwords do not match.")

    # Create the user
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'username': value.username}

    def to_internal_value(self, data):
        return User.objects.get(id=data)


class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['friends']


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserRelatedField(source='from_user.user', read_only=True)
    to_user = UserRelatedField(source='to_user.user', read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'to_user', 'from_user', 'created_at']


class CreateFriendRequestSerializer(serializers.ModelSerializer):
    to_user = serializers.CharField()

    class Meta:
        model = FriendRequest
        fields = ['to_user',]


class RespondFriendRequestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = FriendRequest
        fields = ['id', 'status',]


class LikeSerializer(serializers.ModelSerializer):
    poem_id = serializers.IntegerField()
    user = UserRelatedField(source='user.user', read_only=True)


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['user', 'content']


class BookmarkSerializer(serializers.ModelSerializer):
    poem = PoemSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = ['poem']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'bio', 'facebook', 'twitter', 'instagram']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_picture']


class ModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['is_private', 'dark_mode']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['title']

class SearchPoemSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(read_only=True)

    class Meta:
        model = Poem
        fields = ['id', 'title', 'content', 'author', 'tags']

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        poem = Poem(
            title=validated_data['title'],
            content=validated_data['content'],
            author=user,
        )
        poem.save()
        return poem