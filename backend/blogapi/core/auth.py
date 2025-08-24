from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from api.models import UserProfile


class BlogTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["isadmin"] = user.is_superuser
        token["username"] = user.username

        return token


def get_token_for_user(user):
    token = BlogTokenObtainPairSerializer.get_token(user)

    return {
        "jwt": str(token.access_token),
    }


class CurrentUserDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context["request"].user


class CurrentProfileDefault:
    requires_context = True

    def __call__(self, serializer_field):
        user = serializer_field.context["request"].user

        if user and user.is_authenticated and hasattr(user, "userprofile"):
            return user.userprofile

        anon_user = User.objects.get(username="anonymous")

        anon_profile, _ = UserProfile.objects.get_or_create(
            user=anon_user, defaults={"bio": "Anonymous user"}
        )

        return anon_profile
