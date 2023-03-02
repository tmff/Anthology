from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Poem


class PoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poem
        fields = ('id','title','content','author','time_created')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','username']


class RegisterSerializer(serializers.ModelSerializer):

    # Email field
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )


    # The chosen password
    password =  serializers.CharField(
        write_only=True,
        required=True,validators=[validate_password],
        style={'input_type': 'password', 'placeholder': 'Password'},
    )


    # Repeating the password
    password2 = serializers.CharField(write_only=True, required=True,style={'input_type': 'password', 'placeholder': 'Confirm Password'},)


    # The metadata for the serialiser
    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
         'email', 'first_name', 'last_name')
        extra_kwargs = {'first_name': {'required': True},'last_name': {'required': True}}


    # Perform password validation
    def validate_password(self,attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        else:
            return attrs


    # Create the user
    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


