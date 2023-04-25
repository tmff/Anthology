from django.contrib.auth.models import User
from django.db import models
from django.db.models import Count, Q
from django.db.models.signals import post_save
from django.dispatch import receiver


import datetime

def upload_path(instance, filename):
    return '/'.join('profile_pictures', [instance.__str__], filename)

# access with freds_department = u.Author.department for example
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ##name = models.CharField(default="", max_length=120) name is contained within the user model
    bio = models.TextField(default="")
    facebook = models.URLField(default="",max_length=200, blank=True)
    twitter = models.URLField(default="",max_length=200, blank=True) 
    instagram = models.URLField(default="",max_length=200, blank=True)
    friends = models.ManyToManyField('self')
    is_private = models.BooleanField(default=False)
    dark_mode = models.BooleanField(default= False)
    profile_picture = models.ImageField(default='profile_pictures/default.jpg', upload_to='profile_pictures')
    # Highlighting
    last_vote_time = models.DateTimeField(default=None, null=True, blank=True)

    def __str__(self):
        return self.user.username
    
    # def __str__(self):
    #     return f"{self.first_name} {self.last_name}"
    
    def get_firstName(self):
        return self.user.first_name
    
    def get_lastName(self):
        return self.user.last_name
    
    def get_bio(self):
        return self.bio


class FriendRequest(models.Model):
    from_user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='friend_requests_sent')
    to_user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="friend_requests_received")
    status = models.CharField(max_length=20, choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')))
    created_at = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class Theme(models.Model):
    theme = models.CharField(max_length=120)
    time_created = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.theme


"""
Represents a poem.

Consists of the following:
- Poem title: the title of the poem.
- Poem content: the actual poem content.
- Author: the author of the poem as a User object.
- Time created: when the poem was submitted to the database.
"""


class Poem(models.Model):

    title = models.CharField(max_length=120)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # TODO - should not be null but it's half 10 in the evening and i need sleep
    time_created = models.DateTimeField(default=datetime.datetime.now)
    is_published = models.BooleanField(default=False)
    tags = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, null=True)

    # Highlighting
    matches_played = models.IntegerField(default=0)
    matches_won = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def get_author(self) -> User:
        return self.author

    def get_content(self) -> str:
        return self.content

    def get_title(self) -> str:
        return self.title
    
    def get_like_count(self) -> int:
        return Like.objects.aggregate(count=Count('pk', filter=Q(poem=self)))["count"]

    def get_bookmark_count(self) -> int:
        return Bookmark.objects.aggregate(count=Count('pk', filter=Q(poem=self)))["count"]

    def get_favourite_count(self) -> int:
        return Favourite.objects.aggregate(count=Count('pk', filter=Q(poem=self)))["count"]

    def get_comment_count(self) -> int:
        return Comment.objects.aggregate(count=Count('pk', filter=Q(poem=self)))["count"]


class Bookmark(models.Model):
 
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Do we replace with a "ghost" user? 
                                                              # No
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE)

    def get_user(self) -> User:
        return self.user

    def get_poem(self) -> Poem:
        return self.poem


class Comment(models.Model):

    poem = models.ForeignKey(Poem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    time_created = models.DateTimeField(default=datetime.datetime.now)
    is_reply = models.BooleanField(default=False)

    def is_self(self, user) -> bool:
        return self.user == user

    def get_reply_count(self) -> int:
        return Reply.objects.aggregate(count=Count('pk', filter=Q(parent_comment=self)))["count"]


class Reply(Comment):
    parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='parent_comment_to_reply')


class Like(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE)  # If the poem is deleted, remove this statistic
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # If the user is deleted, remove this statistic


class Favourite(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def get_poem(self) -> Poem:
        return self.poem
    def get_user(self) -> User:
        return self.user


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()