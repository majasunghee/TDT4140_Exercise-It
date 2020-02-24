from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


from rest_framework.parsers import MultiPartParser, FormParser

from .models import CustomUser, Musclegroup, Exercise, Workout, Post, Feedback
from rest_framework import viewsets
from .serializers import UserSerializer, MusclegroupSerializer, ExerciseSerializer, WorkoutSerializer, FeedbackSerializer
from django.views import View
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def getUserExercises(self):
        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

    def getUserWorkouts(self):
        queryset = Workout.objects.all()
        serializer_class = WorkoutSerializer


class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        response = super(LoginView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class GetMeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def list(self, request):
        user = CustomUser.objects.get(username=request.user.username)
        return Response({'username': user.username, 'email': user.email, 'role': user.role, 'visibility': user.visibility})


class MusclegroupViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    authentication_classes = ()

    queryset = Musclegroup.objects.all()
    serializer_class = MusclegroupSerializer


class ExerciseViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    authentication_classes = ()

    parser_classes = (MultiPartParser, FormParser)

    queryset = Exercise.objects.all().order_by('-id')
    serializer_class = ExerciseSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    authentication_classes = ()

    parser_classes = (MultiPartParser, FormParser)

    queryset = Workout.objects.all().order_by('-id')
    serializer_class = WorkoutSerializer


class GetSingleWorkout(APIView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        post = Workout.objects.get(id=request.data['id'])
        return Response({'title': post.title, 'image': post.image.url, 'content': post.content, 'date': post.date, 'user': post.username, 'userrole': post.user.role})


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def getFeedbackForPost(self):
        queryset = Post.objects.all()
        serializer_class = FeedbackSerializer


class FeedViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    def getPopularPublicExercises():
        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

    def getPopularPublicWorkouts():
        queryset = Workout.objects.all()
        serializer_class = WorkoutSerializer

    def getPopularProfessionalExercises():
        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

    def getPopularProfessionalWorkouts():
        queryset = Workout.objects.all()
        serializer_class = WorkoutSerializer

    def getLatestExercises():
        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

    def getLatestWorkouts():
        queryset = Workout.objects.all()
        serializer_class = WorkoutSerializer

    def getHighestRatedExercises():
        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

    def getHighestRatedWorkouts():
        queryset = Workout.objects.all()
        serializer_class = WorkoutSerializer

    def getExercisesByMuscles():
        queryset = Exercise.objects.all()
        serializer_class = UserSerializer

    def getWorkoutsByExercises():
        queryset = Workout.objects.all()
        serializer_class = UserSerializer
