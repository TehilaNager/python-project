from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import (
    UserViewSet,
    UserProfileViewSet,
    ArticleViewSet,
    ArticleUserLikesViewSet,
    CommentViewSet,
    TagViewSet,
    AuthViewSet,
    BlogTokenObtainPairView,
)

router = DefaultRouter()

router.register("tags", TagViewSet, basename="tags")
router.register("comments", CommentViewSet, basename="comments")
router.register("articles", ArticleViewSet, basename="articles")
router.register("likes", ArticleUserLikesViewSet, basename="likes")
router.register("userprofiles", UserProfileViewSet, basename="userprofiles")
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("register/", AuthViewSet.as_view({"post": "register"}), name="register"),
    path("token/", BlogTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
