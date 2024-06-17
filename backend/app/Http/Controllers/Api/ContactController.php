<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $details = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
        ];

        Mail::send('emails.contact', ['details' => $details], function($message) use ($details){
            $message->to('receipient@example.com')
            ->subject('Contact Form Message');
        });

        return response()->json(['message' => 'Email inviata correttamente']);

    }
}
