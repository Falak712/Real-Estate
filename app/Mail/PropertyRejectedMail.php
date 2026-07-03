<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PropertyRejectedMail extends Mailable
{
    use Queueable, SerializesModels;
    public $realstate;
    /**
     * Create a new message instance.
     */
    public function __construct($realstate)
    {
        $this->realstate = $realstate;
    }
    public function build()
    {
        return $this->subject('تم رفض عقارك')
            ->view('emails.property_rejected')
            ->with([
                'realstate' => $this->realstate,
                'title' => $this->realstate->title,
                'description' => $this->realstate->description,
                'price' => $this->realstate->price,
                'location' => $this->realstate->location,
                'size' => $this->realstate->size,
                'sides' => $this->realstate->sides,
                'address' => $this->realstate->address,
                'type_real_estate' => $this->realstate->type_real_estate,
                'status_real_estate' => $this->realstate->status_real_estate,
                'publication_date' => $this->realstate->publication_date
            ]);
    }
}
