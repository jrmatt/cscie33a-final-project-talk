from rest_framework import serializers
from .models import *

class PromptSerializer(serializers.ModelSerializer):

    class Meta:

        model = Prompt
        
        fields = ['id', 'prompt', 'created_at']


class NewResponseSerializer(serializers.ModelSerializer):

    class Meta:

        model = Response

        fields = ['identity']


class ListResponseSerializer(serializers.ModelSerializer):

    class Meta:

        model = Response

        fields = ['prompt', 'audio', 'transcript', 'created_at', 'expires_at', 'identity', 'public']



class CollectionSerializer(serializers.ModelSerializer):

    class Meta:

        model = Collection

        fields = ['id', 'collection']