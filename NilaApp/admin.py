from django.contrib import admin
from .models import *

admin.site.register(Counselor),
admin.site.register(Availability),
admin.site.register(Booking),
admin.site.register(UserProfile),