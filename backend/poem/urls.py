from django.urls import path
from rest_framework import routers
from .views import UserDetailAPI,RegisterUserAPIView, PoemView

router = routers.DefaultRouter()
router.register(r'poems', PoemView)

urlpatterns = [
  path("", include(router.urls)),
  path("get-details", UserDetailAPI.as_view()),
  path("register", RegisterUserAPIView.as_view()),
]
