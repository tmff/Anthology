from django.urls import path, include
from rest_framework import routers
from .views import *
from django.conf.urls.static import static
from django.conf import settings 


class BetterRouter(routers.DefaultRouter):

    def __init__(self, *args, **kwargs):
        super(routers.DefaultRouter, self).__init__(*args, **kwargs)
        self.trailing_slash = '/?'


router = BetterRouter()
router.register(r'poems', PoemView)
router.register(r'get-friends-poems', PoemFriendListView, basename='get-friends-poems')
router.register(r'get-highlight-choice', HighlightChoiceView, basename='get-highlight-choice')
router.register(r'pending-request', PendingRequestView, basename='pending-request')
router.register(r'get-users', UserViewSet, basename='get-users')
router.register(r'get-tagged-poems', TaggedPoemViewSet, basename='get-tagged-poems')
router.register(r'get-posts', PostsViewSet, basename='get-posts')
router.register(r'get-bookmarks', FetchBookmarkedPoemsView, basename='get-bookmarks')

urlpatterns = [
  path("", include(router.urls)),
  path("get-details", UserDetailAPI.as_view()),
  path("register", RegisterUserAPIView.as_view()),
  path("submit-highlight-vote", SubmitHighlightPoem.as_view()),
  path("get-highlight", HighlightedPoem.as_view()),
  path("send-friend-request", SendFriendRequestView.as_view()),
  path("accept-friend-request", PendingRequestResponseView.as_view()),
  path("like-poem", LikePoemView.as_view()),
  path("remove-poem-like", UnlikePoemView.as_view()),
  path("send-comment", CommentPoemView.as_view()),
  path("delete-comment", DeleteCommentView.as_view()),
  path("bookmark", BookmarkPoemView.as_view()),
  path("remove-bookmark", RemoveBookmarkPoemView.as_view()),
  path("edit-profile", EditProfileView.as_view()),
  path("edit-picture", EditPictureView.as_view()),
  path("edit-mode", EditModeView.as_view()),
  path("get-comments/<int:poem_id>/", FetchCommentsPoemView.as_view({'get': 'list'}))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
