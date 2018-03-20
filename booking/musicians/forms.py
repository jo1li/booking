import account.forms


class SignupForm(account.forms.SignupForm):

    field_order = [
        'email',
        'password',
    ]

    def __init__(self, *args, **kwargs):
        super(SignupForm, self).__init__(*args, **kwargs)
        del self.fields["username"]
        del self.fields["password_confirm"]

