from django.contrib.auth.models import User
from django.db import models
from django.db.models import Count, Q

import datetime

GHOST_USER = User()

"""
Represents a poem.

Consists of the following:
- Poem title: the title of the poem.
- Poem content: the actual poem content.
- Author: the author of the poem as a User object.
- Time created: when the poem was submitted to the database.
"""
class Tag(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title


class Poem(models.Model):

    title = models.CharField(max_length=120)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # TODO - should not be null but it's half 10 in the evening and i need sleep
    time_created = models.DateTimeField(default=datetime.datetime.now)
    is_published = models.BooleanField(default=False)
    tags = models.ForeignKey(Tag, on_delete=models.SET_NULL,null = True)


    def __str__(self):
        return self.title
    

    def get_author(self) -> User:
        return self.author
    

    def get_content(self) -> str:
        return self.content
    

    def get_title(self) -> str:
        return self.title
    

    def get_bookmark_count(self) -> int:
        return Bookmark.objects.aggregate(count = Count('pk', filter=Q(poem=self)))["count"]
    

    def get_comment_count(self) -> int:
        return Comment.objects.aggregate(count = Count('pk', filter=Q(poem=self)))["count"]


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


class Reply(Comment):
    parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='parent_comment_to_reply')


