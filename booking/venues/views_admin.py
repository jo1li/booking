from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.admin.views.decorators import staff_member_required


@staff_member_required
def create(request):
    return render_to_response(
        "admin/booking_agent/create.html",
        {'book_list' : {}},
        RequestContext(request, {}),
    )
