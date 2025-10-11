<x-mail::message>
    Hello {{ $user->name }},

    @if ($user->is_admin)
        Your account has been made admin. you can login to your account.
        <x-mail::button :url="route('login')">Click here to login</x-mail::button>
    @else
        Your account has been made regular user.
    @endif

    Thank you for using our application.
    {{ config('app.name') }}

    <x-mail::button :url="route('login')">Click here to login</x-mail::button>
</x-mail::message>
