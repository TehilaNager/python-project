from django.contrib import admin
from .models import UserProfile, Comment, Article, ArticleUserLikes, Tag

admin.site.register([UserProfile, Comment, Article, ArticleUserLikes, Tag])
