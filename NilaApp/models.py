from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Counselor(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    experience = models.IntegerField()

    image = models.URLField(blank=True, null=True)
    therapy_hours = models.CharField(max_length=100, blank=True)
    expertise = models.JSONField(default=list)
    video_duration = models.CharField(max_length=20, blank=True)
    progress = models.CharField(max_length=10, blank=True)
    available_slots = models.JSONField(default=list)
    price = models.IntegerField(default=0)
    location = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.name
    
#USER
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="profile")
    mobile = models.CharField(max_length=15, blank=True, null=True)
    def __str__(self):
        return self.user.username

#AVAILABILITY 
class Availability(models.Model):
    counselor = models.ForeignKey(
        Counselor,
        on_delete=models.CASCADE,
        related_name="availabilities"
    )
    counselor_name = models.CharField(max_length=50,blank=True)
    day_of_week = models.CharField(max_length=10)
    
    start_time = models.TimeField()
    end_time = models.TimeField(default='8:00')

    session_duration = models.IntegerField(default=30)

    def __str__(self):
        return f"{self.counselor} - {self.day_of_week}"

# USER BOOKING SLOTS

class Booking(models.Model):

    counselor = models.ForeignKey(
        "Counselor",
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    counselor_name= models.CharField(max_length=50, default='Den')

    # Optional logged-in user
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    user_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    mode = models.CharField(
        max_length=20,
        choices=[
            ("Video-Call", "Video-Call"),
            ("phone-Call", "phone-Call"),
            ("In-Person", "In-Person"),
        ],
        default="Video-Call"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("paid", "Paid"),
            ("failed", "Failed"),
        ],
        default="paid"
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ("booked", "Booked"),
            ("cancelled", "Cancelled"),
        ],
        default="booked"
    )
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user_name} - {self.date} {self.time}"
    
#-----------------#--------------#--------------------##-----------------#--------------#--------------------#
#-----------------#--------------#--------------------##-----------------#--------------#--------------------#