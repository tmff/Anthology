from django.contrib import admin

from .models import Poem,Tag
# Register your models here.

class PoemAdmin(admin.ModelAdmin):
    list_display = ('title','content')

class TagAdmin(admin.ModelAdmin):
    list_display = ('title',)

admin.site.register(Poem,PoemAdmin)
admin.site.register(Tag,TagAdmin)