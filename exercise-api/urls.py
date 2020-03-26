from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from .quickstart import views
from rest_framework.authtoken import views as auth_views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('musclegroups', views.MusclegroupViewSet)
router.register('exercises', views.ExerciseViewSet)
router.register('workouts', views.WorkoutViewSet)
router.register('feedback', views.FeedbackViewSet)
router.register('auth', views.GetMeView, basename='CustomUser')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url('admin/', admin.site.urls),
    url('', include(router.urls)),
    url('login/', views.LoginView.as_view()),
    url('exercise/', views.GetSingleExercise.as_view()),
    url('workout/', views.GetSingleWorkout.as_view()),
    url('userdata/', views.UserPostsViewSet.as_view()),
]
