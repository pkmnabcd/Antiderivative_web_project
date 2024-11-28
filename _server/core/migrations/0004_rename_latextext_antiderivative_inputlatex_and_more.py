# Generated by Django 5.1.3 on 2024-11-26 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_filledantiderivative_filledconstant_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='antiderivative',
            old_name='latexText',
            new_name='inputLatex',
        ),
        migrations.RenameField(
            model_name='filledantiderivative',
            old_name='latexText',
            new_name='postSolutionLatex',
        ),
        migrations.AddField(
            model_name='antiderivative',
            name='solutionTemplate',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='filledantiderivative',
            name='preSolutionLatex',
            field=models.TextField(default='default'),
            preserve_default=False,
        ),
    ]