from django.shortcuts import render
from django.http import HttpResponseNotFound

from core.models import Transaction, IntrestRate


def index(request):
    if not request.user.is_superuser:
        return HttpResponseNotFound("<h1>Page not found</h1>")
        
    if request.method == "POST":
        data = request.POST
        if data.get('interest_rate'):
            rate = data.get('interest_rate')
            IntrestRate.objects.create(rate=rate)
        else:
            ref = request.POST['ref']
            DONE_STATE = 2
            transaction = Transaction.objects.get(ref=ref)
            transaction.state = DONE_STATE
            transaction.save()

    RECIVE_ACTION = 1 
    PENDING_STATE = 1
    try:
        rate = IntrestRate.objects.last().rate
    except:
        rate = 0

    transactions = Transaction.objects.filter(action=RECIVE_ACTION, state=PENDING_STATE)

    return render(request, 'index.html', {"transactions": transactions, "rate": rate})
