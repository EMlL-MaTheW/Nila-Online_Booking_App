from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CounselorViewSet, BookingViewSet

router = DefaultRouter()
router.register('counselors', CounselorViewSet, basename='counselor')
router.register('bookings', BookingViewSet, basename='booking')

# ADMIN ROUTES
router.register('admin/counselors', AdminCounselorViewSet,basename='admin-counselor')
router.register('admin/bookings', AdminBookingViewSet, basename='admin-booking')
router.register('admin/availability', AvailabilityViewSet, basename='availability')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register),
    path('login/', user_login),
    path('admin/login/', admin_login),
    # path("me/", current_user),
    # path("my-bookings/", user_bookings),
    # path('profile/', user_profile),
    #USER DASHBOARD
    path("profile/", UserProfileView.as_view()),
    path("user/upcoming-bookings/",UpcomingBookingsView.as_view()),
    path("user/past-bookings/",PastBookingsView.as_view()),
    path("user/payment-history/", PaymentHistoryView.as_view()),
]



