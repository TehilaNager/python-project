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
        tag_web, _ = Tag.objects.get_or_create(name="Web Development")
        tag_database, _ = Tag.objects.get_or_create(name="Database")

        articles_data = [
            {
                "title": "First Article",
                "text": "This is the content of the first article - an example of database seeding.",
                "tags": [tag_python, tag_web],
            },
            {
                "title": "Second Article",
                "text": "This is the content of the second article - another example.",
                "tags": [tag_django, tag_web],
            },
            {
                "title": "Third Article",
                "text": "This is the content of the third article - more example content.",
                "tags": [tag_python, tag_database],
            },
            {
                "title": "Fourth Article",
                "text": "This is the content of the fourth article - even more example content.",
                "tags": [tag_django, tag_database],
            },
        ]

        for article_data in articles_data:
            article, _ = Article.objects.get_or_create(
                title=article_data["title"],
                defaults={
                    "author": admin_profile,
                    "text": article_data["text"],
                    "status": "published",
                    "created_at": timezone.now(),
                },
            )
            article.tags.set(article_data["tags"])

            Comment.objects.get_or_create(
                article=article,
                author=regular_profile,
                text=f"First comment on {article.title}",
            )
            Comment.objects.get_or_create(
                article=article,
                author=regular_profile,
                text=f"Second comment on {article.title}",
            )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
