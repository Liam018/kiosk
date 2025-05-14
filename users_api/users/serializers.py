from rest_framework import serializers
from .models import UserAdd, Announcements, Room, Feedback, Question, FeedbackResponse
from django.contrib.auth.hashers import make_password

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdd
        fields = ['account_id', 'username', 'password', 'user_level']
        extra_kwargs = {
            'password': {'write_only': True},
            'user_level': {'read_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['user_level'] = 'admin'
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdd
        fields = ['account_id', 'username', 'password', 'user_level']
        extra_kwargs = {
            'user_level': {'read_only': True},
        }

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        else:
            validated_data['password'] = instance.password
        return super().update(instance, validated_data)

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcements
        fields = [
            'announcement_id',
            'announcement_title',
            'announcement_description',
            'announcement_start_date',
            'announcement_end_date',
            'is_archived',
            'views'
        ]

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['room_id', 'room_number', 'room_name']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text']

class FeedbackResponseSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    rating = serializers.ChoiceField(choices=FeedbackResponse.RATING_CHOICES)

    class Meta:
        model = FeedbackResponse
        fields = ['question', 'rating']

class FeedbackSerializer(serializers.ModelSerializer):
    responses = FeedbackResponseSerializer(many=True)

    class Meta:
        model = Feedback
        fields = ['id', 'name', 'role', 'responses', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        feedback = Feedback.objects.create(**validated_data)
        for response_data in responses_data:
            FeedbackResponse.objects.create(feedback=feedback, **response_data)
        return feedback