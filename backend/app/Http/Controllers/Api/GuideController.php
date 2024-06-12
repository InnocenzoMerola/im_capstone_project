<?php

namespace App\Http\Controllers\Api;

use App\Models\Guide;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGuideRequest;
use App\Http\Requests\UpdateGuideRequest;
use Illuminate\Http\Request;

class GuideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guides = Guide::with('stops')->get();
        // $guides = Guide::all();
        return response()->json($guides);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name_it' => 'nullable|string|max:100',
            'name_en'  => 'nullable|string|max:100',
            'name_fr' => 'nullable|string|max:100',
            'name_na' => 'nullable|string|max:100',
            'date'=> 'nullable',
            'price' => 'nullable',
            'mobility' => 'nullable|string|max:50',
            'duration' => 'nullable|string',
            'stops' => 'required|array',
            'stops.*.id' => 'exists:stops,id'
        ]);

        $guide = new Guide([
            'name_it' => $data['name_it'],
            'name_en' => $data['name_en'],
            'name_fr' => $data['name_fr'],
            'name_na' => $data['name_na'],
            'date' => $data['date'],
            'price' => $data['price'],
            'mobility' => $data['mobility'],
            'duration' => $data['duration'],
        ]);

        $guide->save();

        $guide->stops()->sync($data['stops']);

        return response()->json($guide, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $guide = Guide::with('stops', 'slots')->find($id);
        if(!$guide){
            return response(['message' => 'Not found'], 404);
        }
        return [
            'data' => $guide
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guide $guide)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuideRequest $request, Guide $guide)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guide $guide)
    {
        //
    }
}
