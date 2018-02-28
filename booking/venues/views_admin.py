from django.template import RequestContext
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django import forms

from django.core.mail import send_mail



class AgentForm(forms.Form):
    email = forms.EmailField(label="Agent's email", required=True)


@staff_member_required
def create(request):

    if request.POST:

        print("in POST block")

        f = AgentForm(request.POST)

        if f.is_valid():

            print("in is_valid block")

            subject = "Welcome to Opus!!!1!"
            message = "Get in here!!!"
            from_email = "info@opuslive.io"
            recipient_list = [f.cleaned_data['email']]

            retval = send_mail(subject, message, from_email, recipient_list)

            print("after send_email: ", retval)


    else:
        f = AgentForm({})

    return render(
        request,
        "admin/booking_agent/create.html",
        {'agent_form' : f}
    )
