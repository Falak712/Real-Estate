<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginNotificationMail extends Mailable
{
    use SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this
            ->subject('تم تسجيل الدخول')
            ->view('emails.login')
            ->with([
                'name' => $this->user->name,
                'time' => now()->format('Y-m-d H:i'),
            ]);
    }
}