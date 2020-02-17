from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

''' User table '''
class CustomUser(AbstractUser):
    role = models.BooleanField(default=False)
    visibility = models.BooleanField(default=False)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)

''' Exercise-related tables '''
class Musclegroup(models.Model):
    name = models.CharField(max_length=30)
    latin = models.CharField(max_length=30)

class Post(models.Model):
    date = models.DateField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=60)
    image = models.ImageField(upload_to='frontend/public/images/')
    content = models.TextField()

class Exercise(Post):
    reps = models.IntegerField()
    sets = models.IntegerField()
    musclegroups = models.ManyToManyField(Musclegroup)

class Workout(Post):
    duration = models.IntegerField()
    exercises = models.ManyToManyField(Exercise)

class Feedback(models.Model):
    rating = models.IntegerField()
    comment = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class FavouritePost(models.Model):
    user = models.ManyToManyField(CustomUser)
    post = models.ManyToManyField(Post)   
    