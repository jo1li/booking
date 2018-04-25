# booking

Opusapp Booking Utility

# Admin

You can login to the admin with chris@opuslive.io / opusadmin.

# Deploy

```bash
echo "y" | gcloud app deploy app.yaml --project opus-booking-stage
```

# A note on templates

This project is likely to go through many iterations of design. To accommodate
building and testing those iterations, be sure to use `opus_render` from the
backend.utils instead of the builtin Django `render()` method. `opus_render`
allows us to toggle between different design versions via GET param, with a
clean fallback.
