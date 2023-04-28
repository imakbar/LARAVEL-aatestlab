<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Models\User;
use App\Models\ForgotPassword;

class MailForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $User;
    public $ForgotPassword;
    public function __construct(User $User, ForgotPassword $ForgotPassword)
    {
        $this->User = $User;
        $this->ForgotPassword = $ForgotPassword;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $User = $this->User;
        $ForgotPassword = $this->ForgotPassword;
        
        return $this->from(appSettingGeneral()['app_email'],appSettingGeneral()['app_name'])
                    ->subject('Forgot Password')
                    ->replyTo(appSettingGeneral()['app_email'], appSettingGeneral()['app_name'])
                    ->view('mail.forgot-password')
                    ->with([
                        'User' => $User,
                        'ForgotPassword' => $ForgotPassword
                    ]);
    }
}
