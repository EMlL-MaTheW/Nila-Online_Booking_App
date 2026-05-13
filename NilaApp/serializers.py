from rest_framework import serializers
from .models import *
from datetime import date

#USER
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_staff"]

#USER REGISTRSTION
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            # mobile=validated_data["mobile"],
        )
        return user

#USER LOGIN
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()    

#ADMIN
class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = "__all__"

class CounselorSerializer(serializers.ModelSerializer):
    formatted_available_slots = serializers.SerializerMethodField(read_only=True)
    
    available_slots = serializers.JSONField(required=False)

    class Meta:
        model = Counselor
        fields = '__all__'

    def get_formatted_available_slots(self, obj):
        return [a.start_time.strftime("%H:%M") for a in obj.availabilities.all()]


# Serializer for the Public Frontend
class PublicCounselorSerializer(serializers.ModelSerializer):
    # available_slots = serializers.SerializerMethodField()

    class Meta:
        model = Counselor
        fields = ['id', 'name', 'title', 'image', 'experience', 'therapy_hours', 
                  'expertise', 'video_duration', 'progress', 
                  'price', 'location']
    def get_available_slots(self, obj):
        today = date.today()

        all_slots = [
            a.start_time.strftime("%H:%M")
            for a in obj.availabilities.all()
        ]

        booked_slots = Booking.objects.filter(
            counselor=obj,
            date=today,
            status="booked"
        ).values_list("time", flat=True)

        booked_slots = [t.strftime("%H:%M") for t in booked_slots]

        return [slot for slot in all_slots if slot not in booked_slots]    

    # def get_available_slots(self, obj):
    #     return [a.start_time.strftime("%H:%M") for a in obj.availabilities.all()]

# class BookingSerializer(serializers.ModelSerializer):
#     counselor = serializers.CharField(source='counselor.name', read_only=True)

#     class Meta:
#         model = Booking
#         fields = '__all__'

#USER BOOKING SERIALIZER
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        exists = Booking.objects.filter(
            counselor=data["counselor"],
            date=data["date"],
            time=data["time"],
            status="booked"
        ).exists()

        if exists:
            raise serializers.ValidationError("This slot is already booked")

        return data     

#USER DETAILS
class UserProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = UserProfile
        fields = [
            "username",
            "email",
            "mobile"
        ]