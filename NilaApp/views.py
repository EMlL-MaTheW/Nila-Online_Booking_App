from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Counselor, Booking
from .serializers import CounselorSerializer, BookingSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
import datetime
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

# class CounselorViewSet(viewsets.ModelViewSet):
#     queryset = Counselor.objects.all()
#     serializer_class = PublicCounselorSerializer


from rest_framework.permissions import IsAuthenticated

class BookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        booking = serializer.save(
            user=request.user,
            counselor_name= serializer.validated_data["counselor"].name
        )

        return Response(
            BookingSerializer(booking).data,
            status=status.HTTP_201_CREATED
        )
        
# class BookingViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):

#         counselor = serializer.validated_data["counselor"]
#         date = serializer.validated_data["date"]
#         time = serializer.validated_data["time"]

#         exists = Booking.objects.filter(
#             counselor=counselor,
#             date=date,
#             time=time,
#             status="booked"
#         ).exists()

#         if exists:
#             raise serializers.ValidationError(
#                 {"error": "Slot already booked"}
#             )

#         serializer.save(user=self.request.user)
    
# ADMIN COUNSELOR 
class AdminCounselorViewSet(viewsets.ModelViewSet):
    queryset = Counselor.objects.all()
    serializer_class = CounselorSerializer

#COUNSELOR AVAILABILITY VIEW(ADMIN)
class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer 
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        availability = serializer.save(
            counselor_name= serializer.validated_data["counselor"].name
        )

        return Response(
            AvailabilitySerializer(availability).data,
            status=status.HTTP_201_CREATED
        )

#COUNSELOR VIEW
class CounselorViewSet(viewsets.ModelViewSet):
    queryset = Counselor.objects.all()
    serializer_class = PublicCounselorSerializer

    @action(detail=True, methods=["get"])
    def available_slots(self, request, pk=None):
        date_str = request.query_params.get("date")

        if not date_str:
            return Response({"error": "Date required"}, status=400)

        try:
            date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
            day_name = date_obj.strftime("%a").lower()  # mon, tue...

            # 1️⃣ Get availability for that day
            availabilities = Availability.objects.filter(
                counselor_id=pk,
                day_of_week=day_name
            )

            if not availabilities.exists():
                return Response([])

            # 2️⃣ Get booked slots
            booked_slots = Booking.objects.filter(
                counselor_id=pk,
                date=date_obj,
                status="booked"
            ).values_list("time", flat=True)

            booked_times = set(t.strftime("%H:%M") for t in booked_slots)

            # 3️⃣ Generate slots dynamically
            free_slots = []

            for a in availabilities:
                current_time = datetime.datetime.combine(date_obj, a.start_time)
                end_time = datetime.datetime.combine(date_obj, a.end_time)

                while current_time < end_time:
                    slot_str = current_time.strftime("%H:%M")

                    if slot_str not in booked_times:
                        free_slots.append(slot_str)

                    # increment using session duration
                    current_time += datetime.timedelta(minutes=a.session_duration)

            return Response(sorted(free_slots))

        except Exception as e:
            return Response({"error": str(e)}, status=500)
# ADMIN BOOKING VIEW
class AdminBookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def update(self, request, *args, **kwargs):
        # Only allow status update
        instance = self.get_object()
        instance.status = request.data.get("status", instance.status)
        instance.save()
        return Response({"message": "Status updated"})    
    
#USER REGISTRATION

@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"})
    return Response(serializer.errors, status=400)    

# USER LOGIN
@api_view(["POST"])
def user_login(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        # ❌ block admin
        if user.is_staff:
            return Response({"error": "Use admin login"}, status=403)

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

    return Response(serializer.errors, status=400)

#ADMIN LOGIN
@api_view(["POST"])
def admin_login(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        if not user.is_staff:
            return Response({"error": "Not an admin"}, status=403)

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

    return Response(serializer.errors, status=400)

#-----------------#--------------#--------------------#
#-----------------#--------------#--------------------#

#USER DETAILS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


#USER DASHBOARD
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })

#BOOKINGS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bookings(request):

    bookings = Booking.objects.filter(user=request.user)

    data = []

    for b in bookings:
        data.append({
            "id": b.id,
            "counselor": b.counselor.name,
            "date": b.date,
            "time": b.time,
            "status": b.status,
        })

    return Response(data)

#save user mobile number
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        serializer = UserProfileSerializer(
            request.user.profile
        )
        return Response(serializer.data)

    def put(self, request):
        profile = request.user.profile
        profile.mobile = request.data.get("mobile")
        profile.save()

        return Response({
            "message": "Profile updated"
        })

#USER VIEW FOR USER DASHBOARD
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "username": user.username,
            "email": user.email,
        })

    def put(self, request):

        user = request.user

        user.username = request.data.get("username")
        user.email = request.data.get("email")

        user.save()

        return Response({
            "message": "Profile updated"
        })
    
#UPCOMING APPOINTMENTS
class UpcomingBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        bookings = Booking.objects.filter(
            user=request.user,
            status="booked"
        ).order_by("date", "time")

        serializer = BookingSerializer(bookings, many=True)

        return Response(serializer.data)
    
#PAST APPOINTMENTS    
class PastBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        bookings = Booking.objects.filter(
            user=request.user
        ).order_by("-date", "-time")

        serializer = BookingSerializer(bookings, many=True)

        return Response(serializer.data)
    
# PAYMENT HISTORY
class PaymentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Booking.objects.filter(
            user=request.user
        ).order_by("-created_at")
        serializer = BookingSerializer(payments, many=True)

        return Response(serializer.data)    