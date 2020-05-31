from django.urls import path

from . import views

urlpatterns = [
    path('states', views.get_all_states),
    path('state/<str:state>', views.cases_by_state),
    path('state/<str:state>/<str:freq>', views.cases_by_state_and_freq),
    path('age', views.get_age_group_details),
    path('hospitals', views.get_hospital_beds),
    path('countries', views.get_all_countries),
    path('country/confirmed/<str:country>', views.confirmed_time_series),
    path('country/recovered/<str:country>', views.recovered_time_series),
    path('country/death/<str:country>', views.death_time_series),
    path('predict', views.Extra_Train.as_view(), name='Extra_Train'),
]