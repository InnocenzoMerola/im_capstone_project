<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile_img' => ['nullable', 'image', 'max:2048']
        ]);

        // $file_path = $request['profile_img'] ? Storage::put('/profiles', $request['profile_img']) : null;
        
        // if($request->hasFile('profile_img')){
        //     Log::info('Profile image file received');
        // }else{
        //     Log::info('No profile image file received');
        // }


        $file_path = $request->file('profile_img') ? $request->file('profile_img')->store('profiles', 'public') : null;
        
        // Log::info('File path: ', $file_path );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'profile_img' => $file_path ? 'storage/' . $file_path : null
        ]);


        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
