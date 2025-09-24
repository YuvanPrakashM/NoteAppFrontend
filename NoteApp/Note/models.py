from django.db import models
import uuid
from Users.models import CustomUser

# Create your models here.
class Note(models.Model):
    note_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,related_name='notes')
    note_title=models.CharField(max_length=255)
    note_content=models.TextField()
    last_updated=models.DateTimeField(auto_now=True)
    created_on=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.note_title



