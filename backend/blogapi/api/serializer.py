from rest_framework.serializers import ModelSerializer
from .models import Comment, Tag, UserProfile, Article, ArticleUserLikes
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$",
                message="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.",
            )
        ],
    )

    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


class ArticleUserLikesSerializer(ModelSerializer):
    class Meta:
        model = ArticleUserLikes
        fields = "__all__"
