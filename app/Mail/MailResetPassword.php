<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Models\User;

class MailResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $User;
    public function __construct(User $User)
    {
        $this->User = $User;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $User = $this->User;
        
        return $this->from(appSettingGeneral()['app_email'],appSettingGeneral()['app_name'])
                    ->subject('Reset Password')
                    ->replyTo(appSettingGeneral()['app_email'], appSettingGeneral()['app_name'])
                    ->view('mail.reset-password')
                    ->with([
                        'User' => $User,
                    ]);
    }
}
