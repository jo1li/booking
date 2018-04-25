
def set_type(strategy, details, user=None, *args, **kwargs):
    """Set user type."""
    if not user:
        return

    user.is_musician = True

    strategy.storage.user.changed(user)
