from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    UserProfileViewSet,
    ArticleViewSet,
    ArticleUserLikesViewSet,
    CommentViewSet,
    TagViewSet,
    AuthViewSet,
)

router = DefaultRouter()

router.register("tags", TagViewSet, basename="tags")
router.register("auth", AuthViewSet, basename="auth")
router.register("comments", CommentViewSet, basename="comments")
router.register("articles", ArticleViewSet, basename="articles")
router.register("likes", ArticleUserLikesViewSet, basename="likes")
router.register("userprofiles", UserProfileViewSet, basename="userprofiles")
router.register("users", UserViewSet, basename="users")

urlpatterns = router.urls
