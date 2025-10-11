<x-mail::message>
    Hello {{ $user->name }},

    Your account has been created.

    **Here is your login information:**

    Email: {{ $user->email }} <br>
    Password: {{ $password }} <br>

    Please login to your account and change your password.

    <x-mail::button :url="route('login')">Click here to login</x-mail::button>

    Thank you for using our application.
    {{ config('app.name') }}
</x-mail::message>
