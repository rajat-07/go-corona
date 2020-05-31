from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import views, status

import pandas as pd

covid_19_india = pd.read_csv('modelapi/datasets/covid_19_india.csv',index_col='Sno')
covid_19_india['Date'] = pd.to_datetime(covid_19_india['Date'], format="%d/%m/%y", exact=True)

AgeGroupDetails = pd.read_csv('modelapi/datasets/AgeGroupDetails.csv',index_col='Sno')

HospitalBedsIndia = pd.read_csv('modelapi/datasets/HospitalBedsIndia.csv',index_col='Sno')

time_series_confirmed = pd.read_csv('modelapi/datasets/time_series_covid_19_confirmed.csv')
time_series_recovered = pd.read_csv('modelapi/datasets/time_series_covid_19_recovered.csv')
time_series_death = pd.read_csv('modelapi/datasets/time_series_covid_19_deaths.csv')

# 0.36
# 1.06
# 1.96
# 2.76
# 3.09
# 3.19
# 4.09
# 4.1899999999999995
# 4.289999999999999
# 4.389999999999999
# 4.489999999999998

# @api_view()
class Extra_Train(views.APIView):
    def post(self, request, *args, **kwargs):
        ageGroup = request.POST.get('Age Group')
        gender = request.POST.get('Gender')
        nationality = request.POST.get('Nationality')
        cityzone = request.POST.get('City Zone')
        education = request.POST.get('Education')
        bwcp = request.POST.get('BWCP')
        hcb = request.POST.get('HCB')
        fever = request.POST.get('Fever')
        dryCough = request.POST.get('Dry Cough')
        diffInBreath = request.POST.get('Diff In Breathing')
        fatigue = request.POST.get('Fatigue')
        res = 0
        total = 11
        # age grp
        if(ageGroup == 'lf'):
            res = res + 0.36
        elif(ageGroup == 'gfls'):
            res = res + 0.34
        else:
            res = res + 0.29
        print(res)
        # gender
        if(gender == 'male'):
            res = res + 0.7
        else:
            res = res + 0.3
        print(res)
        # nationality
        if(nationality == 'ind'):
            res = res + 0.1
        else:
            res = res + 0.9
        print(res)
        # city zone
        if(cityzone == 'r'):
            res = res + 0.8
        elif(cityzone == 'o'):
            res = res + 0.1
        else:
            res = res + 0.1
        print(res)
        # education
        if(education == 'lhs'):
            res = res + 0.11
        elif(education == 'hs'):
            res = res + 0.28
        elif(education == 'sclg'):
            res = res + 0.28
        elif(education == 'bdeg'):
            res = res + 0.33
        else:
            res = res + 0
            total = total - 1
        print(res)
        # bwcp
        if(bwcp == 'true'):
            res = res + 0.9
        else:
            res = res + 0.1
        print(bwcp)
        print(res)
        # hcb
        if(hcb == 'true'):
            res = res + 0.1
        else:
            res = res + 0.9
        print(res)
        # fever
        if(fever == 'true'):
            res = res + 0.9
        else:
            res = res + 0.1
        print(res)
        # dryCough
        if(dryCough == 'true'):
            res = res + 0.9
        else:
            res = res + 0.1
        print(res)
        # diffInBreath
        if(diffInBreath == 'true'):
            res = res + 0.9
        else:
            res = res + 0.1
        print(res)
        # fatigue
        if(fatigue == 'true'):
            res = res + 0.9
        else:
            res = res + 0.1
        print(res)
        res = (res / total) * 100
        res = int(res)
        # ress = []
        # wess = {}
        # wess['lr'] = ageGroup
        # wess['oa'] = nationality
        # wess['ep'] = education
        # wess['bs'] = hcb
        # ress.append(wess)
        return Response({'res': res})
    

@api_view()
def get_all_states(request):
    c = covid_19_india['State/UnionTerritory'].unique()
    return Response(
        c
    )

@api_view()
def get_all_countries(request):
    c = time_series_confirmed['Country/Region'].unique()
    return Response(
        c
    )

@api_view()
def cases_by_state(request, state):
    c = covid_19_india[covid_19_india['State/UnionTerritory'] == state]
    c['Date'] = c['Date'].apply(lambda x: x.strftime('%Y-%m-%d'))
    return Response(
        c
        .set_index('Date')[[
            'Cured','Deaths','Confirmed',
        ]]
        .to_dict()
    )

@api_view()
def cases_by_state_and_freq(request, state, freq):
    c = (
        covid_19_india[
            (covid_19_india['State/UnionTerritory'] == state)
        ][[
            'Date','Cured','Deaths','Confirmed',
        ]]
    )
    if freq == 'monthly':
        c = c.groupby(c['Date'].dt.month).aggregate('max')
    elif freq == 'weekly':
        c = c.groupby(c['Date'].dt.week).aggregate('max')
    c['Date'] = c['Date'].apply(lambda x: x.strftime('%Y-%m-%d'))
    return Response(
        c
        .set_index(c['Date'])
        .to_dict()
    )

@api_view()
def get_age_group_details(request):
    return Response(
        AgeGroupDetails.to_dict()
    )

@api_view()
def get_hospital_beds(request):
    return Response(
        HospitalBedsIndia.set_index('State/UT')['TotalPublicHealthFacilities_HMIS'][:-1].to_dict()
    )

@api_view()
def confirmed_time_series(request,country):
    return Response(
        time_series_confirmed[time_series_confirmed['Country/Region'] == country]
        .T[4:]
        .sum(axis=1)
        .to_dict()
    )

@api_view()
def recovered_time_series(request,country):
    return Response(
        time_series_recovered[time_series_recovered['Country/Region'] == country]
        .T[4:]
        .sum(axis=1)
        .to_dict()
    )

@api_view()
def death_time_series(request,country):
    return Response(
        time_series_death[time_series_death['Country/Region'] == country]
        .T[4:]
        .sum(axis=1)
        .to_dict()
    )