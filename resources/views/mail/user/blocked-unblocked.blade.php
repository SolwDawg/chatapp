<x-mail::message>
    Hello {{ $user->name }},

    @if ($user->blocked_at)
        Your account has been blocked.
    @else
        Your account has been activated. you can login to your account.
        <x-mail::button :url="route('login')">Click here to login</x-mail::button>
    @endif

    Thank you for using our application.
    {{ config('app.name') }}
</x-mail::message>
