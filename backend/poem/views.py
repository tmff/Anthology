from django.shortcuts import render


from rest_framework import viewsets
from .serializers import PoemSerializer
from .models import Poem
# Create your views here.



class PoemView(viewsets.ModelViewSet):
    serializer_class = PoemSerializer
    queryset = Poem.objects.all()