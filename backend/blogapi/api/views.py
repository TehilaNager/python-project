from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from core.auth import get_token_for_user
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
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
                "login": "http://127.0.0.1:8000/api/auth/login",
                "register": "http://127.0.0.1:8000/api/auth/register",
            }
        )

    @action(methods=["post", "get"], detail=False)
    def register(self, request):
        serializer = UserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        jwt = get_token_for_user(user)

        UserProfile.objects.get_or_create(user)

        return Response(
            {"message": "Registered successfully", "user": serializer.data, **jwt}
        )

    @action(methods=["post", "get"], detail=False)
    def login(self, request):
        serializer = AuthTokenSerializer(
            data=request.data, context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        jwt = get_token_for_user(user)

        return Response(jwt)
