from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Poem,Tag,Profile,FriendRequest
# Register your models here.

class PoemAdmin(admin.ModelAdmin):
    list_display = ('title','content')

class TagAdmin(admin.ModelAdmin):
    list_display = ('title',)

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    filter_horizontal = ('friends',)

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

class RequestAdmin(admin.ModelAdmin):
    list_display = ('to_user','from_user','status')


admin.site.unregister(User)
admin.site.register(Poem,PoemAdmin)
admin.site.register(Profile)
admin.site.register(Tag,TagAdmin)
admin.site.register(User,UserAdmin)
admin.site.register(FriendRequest,RequestAdmin)
