from django.db import models
from django.utils.timezone import now

class UserAdd(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
    ]

    account_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True, blank=False)
    password = models.CharField(max_length=128, blank=False)
    user_level = models.CharField(max_length=10, choices=ROLE_CHOICES, default='admin')

    class Meta:
        managed = False
        db_table = 'user_account_tbl'

class Announcements(models.Model):
    announcement_id = models.AutoField(primary_key=True)
    announcement_title = models.CharField(max_length=100, blank=False)
    announcement_description = models.TextField(blank=False)
    announcement_start_date = models.DateTimeField(blank=False)
    announcement_end_date = models.DateTimeField(blank=False)
    is_archived = models.BooleanField(default=False)
    views = models.IntegerField(default=0)

    class Meta:
        managed = False
        db_table = 'announcement_tbl'

    def save(self, *args, **kwargs):
        if self.announcement_end_date < now():
            self.is_archived = True
        super().save(*args, **kwargs)

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_number = models.CharField(max_length=50)
    room_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'navigation_tbl'

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField(blank=False)

    class Meta:
        managed = True
        db_table = 'question_tbl'

class Feedback(models.Model):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('employee', 'Employee'),
        ('parent', 'Parent/Guardian'),
        ('visitor', 'Visitor'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'feedback_tbl'

class FeedbackResponse(models.Model):
    RATING_CHOICES = [
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('normal', 'Normal'),
        ('needs improvement', 'Needs improvement'),
    ]

    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='feedback_responses')
    rating = models.CharField(max_length=20, choices=RATING_CHOICES, blank=False)

    class Meta:
        managed = True
        db_table = 'feedback_response_tbl'
        unique_together = ('feedback', 'question')
        indexes = [
            models.Index(fields=['feedback', 'question']),
        ]