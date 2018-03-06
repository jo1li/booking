from django.conf import settings
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import reverse
from django.core.mail import send_mail
from django import forms

class AgentForm(forms.Form):
    email = forms.EmailField(label="Agent's email", required=True)


@staff_member_required
def create(request):

    if request.POST:

        f = AgentForm(request.POST)

        if f.is_valid():

            subject = "Welcome to Opus!!!1!"
            message = "Get in here!!!\n\n http://{}{}".format(settings.SITE_DOMAIN, reverse('venue_welcome'))
            from_email = "info@opuslive.io"
            recipient_list = [f.cleaned_data['email']]

            send_mail(subject, message, from_email, recipient_list)

    else:
        f = AgentForm()

    return render(
        request,
        "admin/booking_agent/create.html",
        {'agent_form' : f}
    )
