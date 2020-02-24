from django.contrib import admin

from .models import CustomUser, Musclegroup, Exercise, Workout


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'visibility')

class MusclegroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'latin')

class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'date', 'image', 'content', 'reps', 'sets')

class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'date', 'image', 'content', 'duration')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Musclegroup, MusclegroupAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Workout, WorkoutAdmin)