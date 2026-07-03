<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingRejectedMail extends Mailable
{
    use Queueable, SerializesModels;
    public $booking;
    /**
     * Create a new message instance.
     */
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
