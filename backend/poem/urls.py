from django.urls import path
from .views import UserDetailAPI,RegisterUserAPIView, PoemView

urlpatterns = [
  path("get-details", UserDetailAPI.as_view()),
  path("register", RegisterUserAPIView.as_view()),
  path("poems", PoemView.as_view()),
]
