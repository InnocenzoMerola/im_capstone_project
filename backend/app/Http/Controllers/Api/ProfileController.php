<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfileRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required','string','email','max:255', Rule::unique('users')->ignore($user->id)],
            'surname' => 'nullable|string|max:50',
            'phone' => ['nullable','string','max:20', Rule::unique('users')->ignore($user->id)],
            'age' => 'nullable|integer|min:0'
        ]);

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->surname = $request->input('surname');
        $user->phone = $request->input('phone');
        $user->age = $request->input('age');
        $user->save();

        return response()->json(['message' => 'Profilo aggiornato con successo']);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        $user = $request->user();

        if(!Hash::check($request->current_password, $user->password)){
            throw ValidationException::withMessages([
                'current_password' => ['Password attuale corretta']
            ]);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Password aggiornata con successo']);
    }


    public function uploadImage(Request $request)
    {
        $request->validate([
            'profile_img' => 'nullable|file|image|max:2048'
        ]);

        $user = $request->user();

        if($request->hasFile('profile_img')){
            $oldProfileImg = $user->profile_img;

            if($oldProfileImg){
                Storage::disk('public')->delete($oldProfileImg);
            }
            
            $file_path = $request->file('profile_img')->store('profiles', 'public');
            $file_path_public = Storage::url($file_path);
            $user->profile_img = $file_path_public;

        }elseif($request->exists('remove_profile_img') && $request->remove_profile_img){
            $oldProfileImg = $user->profile_img;

            if($oldProfileImg){
                Storage::disk('public')->delete($oldProfileImg);
                $user->profile_img = null;
            }
        }
        

        $user->save();



        return response()->json([
            'message' => 'Immagine aggiornata con successo', 
            'file_path' => $file_path_public
        ]);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
