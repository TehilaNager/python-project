from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import UserProfile, Article, Comment, Tag
from django.utils import timezone


class Command(BaseCommand):
    help = "Seed database with initial data (users, profiles, articles, comments, tags)"

    def handle(self, *args, **kwargs):
        admin_user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@test.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            admin_user.set_password("Admin123!")
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created admin user"))
        admin_profile, _ = UserProfile.objects.get_or_create(user=admin_user)

        regular_user, created = User.objects.get_or_create(
            username="tehila", defaults={"email": "tehila@test.com"}
        )
        if created:
            regular_user.set_password("Tehila123!")
            regular_user.save()
            self.stdout.write(self.style.SUCCESS("Created regular user"))
        regular_profile, _ = UserProfile.objects.get_or_create(user=regular_user)

        tag_python, _ = Tag.objects.get_or_create(name="Python")
        tag_django, _ = Tag.objects.get_or_create(name="Django")

        article1, _ = Article.objects.get_or_create(
            title="First Article",
            defaults={
                "author": admin_profile,
                "text": "This is the content of the first article - an example of database seeding.",
                "status": "published",
                "created_at": timezone.now(),
            },
        )
        article1.tags.add(tag_python)

        article2, _ = Article.objects.get_or_create(
            title="Second Article",
            defaults={
                "author": admin_profile,
                "text": "This is the content of the second article - another example.",
                "status": "published",
                "created_at": timezone.now(),
            },
        )
        article2.tags.add(tag_django)

        Comment.objects.get_or_create(
            article=article1,
            author=regular_profile,
            text="First comment on the first article",
        )
        Comment.objects.get_or_create(
            article=article1,
            author=regular_profile,
            text="Another comment on the first article",
        )
        Comment.objects.get_or_create(
            article=article2,
            author=regular_profile,
            text="First comment on the second article",
        )
        Comment.objects.get_or_create(
            article=article2,
            author=regular_profile,
            text="Another comment on the second article",
        )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
