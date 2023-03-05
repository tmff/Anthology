from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Poem,Tag,Profile
# Register your models here.

class PoemAdmin(admin.ModelAdmin):
    list_display = ('title','content')

class TagAdmin(admin.ModelAdmin):
    list_display = ('title',)

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)


admin.site.unregister(User)
admin.site.register(Poem,PoemAdmin)
admin.site.register(Tag,TagAdmin)
admin.site.register(User,UserAdmin)