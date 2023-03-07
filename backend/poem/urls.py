from django.urls import path, include
from rest_framework import routers
from .views import UserDetailAPI,RegisterUserAPIView, PoemView, PoemFriendListView

router = routers.DefaultRouter()
router.register(r'poems', PoemView)
router.register(r'get-friends-poems', PoemFriendListView)

urlpatterns = [
  path("", include(router.urls)),
  path("get-details", UserDetailAPI.as_view()),
  path("register", RegisterUserAPIView.as_view()),
]
