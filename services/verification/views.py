from django.shortcuts import render
from django.http import HttpResponseNotFound, HttpResponseRedirect

from core.models import Account, ProfileAssesment


def index(request):
    domain = request.build_absolute_uri('/')[:-1]
    VERIFIED = 3

    if not request.user.is_superuser:
        return HttpResponseNotFound("<h1>Page not found</h1>")
        
    if request.method == "POST":
        data = request.POST
        user = Account.objects.get(email=data.get("user"))
        user.verified = VERIFIED
        user.save()
        return HttpResponseRedirect("/verification")


    assesments = ProfileAssesment.objects.all().exclude(user__verified=VERIFIED)
    accounts = Account.objects.all()

    return render(request, 'verification_index.html', {"assesments": assesments, "accounts": accounts, "domain": domain})
