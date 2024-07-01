<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($request->fails()){
            return response()->json([
                'errors' => $request->errors()
            ], 422);
        }

        return response()->json(['message' => 'Successo'], 200);
    }
}
