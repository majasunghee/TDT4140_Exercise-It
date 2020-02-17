# Generated by Django 3.0.3 on 2020-02-09 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0003_auto_20200209_1910'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='text',
            new_name='content',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='muscleGroups',
        ),
        migrations.RemoveField(
            model_name='post',
            name='imgUrl',
        ),
        migrations.RemoveField(
            model_name='post',
            name='public',
        ),
        migrations.RemoveField(
            model_name='workout',
            name='exercises',
        ),
        migrations.AddField(
            model_name='customuser',
            name='visibility',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='exercise',
            name='reps',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='exercise',
            name='sets',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='musclegroup',
            name='latin',
            field=models.CharField(default='latinname', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='', upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workout',
            name='duration',
            field=models.IntegerField(default=60),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='MusclesInExercise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise', models.ManyToManyField(to='quickstart.Exercise')),
                ('musclegroup', models.ManyToManyField(to='quickstart.Musclegroup')),
            ],
        ),
        migrations.CreateModel(
            name='ExercisesInWorkout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise', models.ManyToManyField(to='quickstart.Exercise')),
                ('workout', models.ManyToManyField(to='quickstart.Workout')),
            ],
        ),
    ]
