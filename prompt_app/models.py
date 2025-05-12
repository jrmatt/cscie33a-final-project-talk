from django.db import models

# Create your models here.
def save_audio_file(instance, filename):
    name, ext = filename.split('.')
    file_path = 'static/prompt_app/audio/{prompt_id}/{response_id}'.format(prompt_id=instance.prompt, response_id=instance.id, ext=ext)
    return file_path

def transcribe_audio():
    pass

class Prompt(models.Model):
    prompt = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    prompt = models.ForeignKey('Prompt', on_delete=models.SET_NULL, related_name='responses', null=True)
    audio = models.FileField(upload_to='prompt_app/audio/')
    transcript = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True)
    identity=models.CharField(max_length=280, default='Anonymous')
    public = models.BooleanField(default=True)


class Collection(models.Model):
    prompt = models.ForeignKey('Prompt', on_delete=models.SET_NULL, related_name='collection', null=True)

