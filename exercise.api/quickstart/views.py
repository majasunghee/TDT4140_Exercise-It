from django.shortcuts import render

from .models import User, Musclegroup, Exercise, Workout, Rating
from rest_framework import viewsets
from .serializers import UserSerializer, MusclegroupSerializer, ExerciseSerializer, WorkoutSerializer, RatingSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class MusclegroupViewSet(viewsets.ModelViewSet):
    queryset = Musclegroup.objects.all().order_by('-date_joined')
    serializer_class = MusclegroupSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all().order_by('-date_joined')
    serializer_class = ExerciseSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all().order_by('-date_joined')
    serializer_class = WorkoutSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('-date_joined')
    serializer_class = RatingSerializer



