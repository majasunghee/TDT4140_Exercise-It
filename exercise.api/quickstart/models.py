from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    role = models.BooleanField()

class Musclegroup(models.Model):
    name = models.CharField(max_length=30)

class Post(models.Model):
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    imgUrl = models.CharField(max_length=50)
    text = models.TextField()
    public = models.BooleanField()

class Exercise(Post):
    muscleGroups = models.ManyToManyField(Musclegroup)

class Workout(Post):
    exercises = models.ManyToManyField(Exercise)

class Rating(models.Model):
    rating = models.IntegerField()
    comment = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class FavouritePost(models.Model):
    user = models.ManyToManyField(User)
    post = models.ManyToManyField(Post)