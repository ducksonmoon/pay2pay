from django.core.mail import BadHeaderError, send_mail

from core.models import Account


def send_email(new_password, email):
    subject = "Your Password"
    message = message_generator(new_password)
    from_email = 'mehrshadbaqerzadegan@gmail.com'

    if subject and message and from_email:
        try:
            send_mail(subject, message, from_email, [email])
        except BadHeaderError:
            return print("Invalid header found.")

        return print("sent")
    else:
        return print("Make sure all fields are entered and valid.")

def message_generator(new_password):
    msg = f'''
    Hi,
    Your Login Password:
    {new_password}

    Alpha Robo
    '''

    return msg


def reset_password(user):
    new_password = Account.objects.make_random_password()
    send_email(new_password=new_password, email=user.email)
    user.set_password(new_password)
    user.save()

    return user
