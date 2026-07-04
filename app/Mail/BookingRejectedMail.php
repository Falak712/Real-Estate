<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;

    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    public function build()
    {
        return $this->subject('تم رفض طلبك')
            ->view('emails.booking_rejected')
            ->with([
                'booking' => $this->booking,
                'start_date' => $this->booking->start_date,
                'end_date' => $this->booking->end_date,
            ]);
    }
}