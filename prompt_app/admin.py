from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Prompt)
admin.site.register(Response)
admin.site.register(Collection)