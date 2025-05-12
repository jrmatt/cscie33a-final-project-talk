from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from prompt_app.serializers import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils import timezone
import os
from dotenv import load_dotenv
from openai import OpenAI

# Get API key from .env 
load_dotenv()
api_key = os.getenv('TRANSCRIBE_API_KEY')
client = OpenAI(api_key=api_key)

# Ensure index route adds CSRF token to cookies
@ensure_csrf_cookie
def index(request):
    return render(request, 'prompt_app/index.html')

# Ensure collection route adds CSRF token to cookies 
# and when refreshes redirects back to index page
@ensure_csrf_cookie
def collection_refresh_fix(request, collection_id):
    return render(request, 'prompt_app/index.html')


# Get the prompt to display on PromptPage for responses
def active_prompt(request): 
    if request.method == 'GET':
        # Retrieve latest prompt
        prompt = Prompt.objects.order_by('-created_at')[0]
        serializer = PromptSerializer(prompt)

        return JsonResponse(serializer.data, safe=False)


# List all prompts
def list_prompts(request): 
    if request.method == 'GET':
        prompts = Prompt.objects.order_by('-created_at')
        serializer = PromptSerializer(prompts, many=True)

        return JsonResponse(serializer.data, safe=False)
    

# Get a specific prompt by its id
def get_prompt(request, prompt_id):
    if request.method == 'GET':
        prompt = Prompt.objects.get(pk=prompt_id)
        serializer = PromptSerializer(prompt)
        response = JsonResponse(serializer.data, safe=False)
        return response

# List all responses for a particular prompt
def list_responses(request, prompt_id): 
    if request.method == 'GET':
        # Retrieve latest prompt
        now = timezone.now()

        # Include only responses for the specified prompt that have not expired and are public
        responses = Response.objects.filter(prompt=prompt_id, expires_at__gt=now, public=True).order_by('-created_at')
        serializer = ListResponseSerializer(responses, many=True)
        response = JsonResponse(serializer.data, safe=False)
        return response


# Save a new recorded response
class SaveResponseCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = NewResponseSerializer(data=request.data) 
        print(request.FILES)
        if serializer.is_valid():
            audio_file = request.FILES.get('audio')
            transcribed_text = self.transcribe_audio(audio_file)

            prompt = Prompt.objects.get(pk=request.data.get('prompt'))

            expires_at = self.calculate_expiration(timezone.now())

            response_object = serializer.save(transcript=transcribed_text, audio=audio_file, expires_at=expires_at, prompt=prompt,),
            return JsonResponse(NewResponseSerializer(response_object).data, status=201)
        return JsonResponse(serializer.errors, status=404)
    
    # Use OpenAI model to transcribe recorded audio 
    def transcribe_audio(self, audio_file):
        try:
            audio_file.seek(0)

            transcript = client.audio.transcriptions.create(
                model='whisper-1',
                file=(audio_file.name, audio_file, 'audio/wav')
            )
            return transcript.text
        except Exception as e:
            print(f'Transcription failed: {e}')
            raise
    
    # Set an expiration date for a response, after which point it will not display
    def calculate_expiration(self, time):
        current_time = time
        three_weeks = timezone.timedelta(weeks=3)
        expiration_date = current_time + three_weeks

        return expiration_date