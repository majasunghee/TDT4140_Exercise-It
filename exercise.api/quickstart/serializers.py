from django.contrib.auth.models import User, Musclegroup, Exercise, Workout, Rating
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'role', 'password', 'savedPosts')

class MusclegroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Musclegroup
        fields = ('muscleId', 'name')

class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Exercise
        fields = ('url', 'exerciseId', 'date', 'user', 'name', 'imgUrl', 'text', 'musclegroups', 'public')

class WorkoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Workout
        fields = ('url', 'workoutId', 'date', 'user', 'title', 'imgUrl', 'text', 'exercises', 'public')

class RatingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rating
        fields = ('ratingID', 'rating', 'comment', 'user', 'post')