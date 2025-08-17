from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile, Tag, Comment, Article, ArticleUserLikes
from .serializer import (
    UserSerializer,
    UserProfileSerializer,
    CommentSerializer,
    TagSerializer,
    ArticleSerializer,
    ArticleUserLikesSerializer,
)
from .permission import (
    IsAdmin,
    CommentOwnerOrReadOnly,
    ArticlesPermission,
    TagsPermission,
    UserLikesPermission,
    UserProfilePermission,
)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]


class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [UserProfilePermission]


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [TagsPermission]


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [CommentOwnerOrReadOnly]


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlesPermission]


class ArticleUserLikesViewSet(ModelViewSet):
    queryset = ArticleUserLikes.objects.all()
    serializer_class = ArticleUserLikesSerializer
    permission_classes = [UserLikesPermission]


class AuthViewSet(ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        return Response(
            {
                "register": "http://127.0.0.1:8000/api/auth/register",
                "login": "http://127.0.0.1:8000/api/token/",
                "refresh": "http://127.0.0.1:8000/api/token/refresh/",
            }
        )

    @action(methods=["post"], detail=False)
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        UserProfile.objects.get_or_create(user=user)

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Registered successfully",
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )
