from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('collection/<int:collection_id>/', views.collection_refresh_fix),

    # Django REST routes
    path('api/prompt/', views.active_prompt),
    path('api/prompt/<int:prompt_id>/', views.get_prompt),
    path('api/prompts/', views.list_prompts),
    path('api/response/', views.SaveResponseCreateView.as_view()),
    path('api/responses/<int:prompt_id>/', views.list_responses)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)