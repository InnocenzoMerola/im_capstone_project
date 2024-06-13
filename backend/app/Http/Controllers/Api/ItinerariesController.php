<?php

namespace App\Http\Controllers\Api;


use App\Models\Itineraries;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreItinerariesRequest;
use App\Http\Requests\UpdateItinerariesRequest;
use Illuminate\Http\Request;

class ItinerariesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itineraries = Itineraries::all();
        return response()->json($itineraries);
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
    public function store(StoreItinerariesRequest $request)
    {
        // $data = $request->all();
        $data = $request->all();
        error_log('Request Data: ' . print_r($data, true));

        $request->validate([
            'name_it' => 'required|string|max:200',
            'name_en' => 'nullable|string|max:200',
            'name_fr' => 'nullable|string|max:200',
            'name_na' => 'nullable|string|max:200',
            'description_it' => 'required|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_na' => 'nullable|string',
        ]);

        $itineraries = new Itineraries([
            'name_it' => $request->input('name_it'),
            'name_en' => $request->input('name_en'),
            'name_fr' => $request->input('name_fr'),
            'name_na' => $request->input('name_na'),
            'description_it' => $request->input('description_it'),
            'description_en' => $request->input('description_en'),
            'description_fr' => $request->input('description_fr'),
            'description_na' => $request->input('description_na'),
        ]);
        
        $itineraries->save();

        return response()->json([
            'status' => 201,
            'message' => 'Itinerario creato con successo'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $itineraries = Itineraries::findOrFail($id);
        if(!$itineraries){
            return response(['status' => 404,'message' => 'Not found'], 404);
        }
        return[
            'data' => $itineraries
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $itineraries = Itineraries::FindOrFail($id);
        return response()->json([
            'status' => 200,
            'itineraries' => $itineraries
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $request->validate([
            'name_it' => 'required|string|max:200',
            'name_en' => 'nullable|string|max:200',
            'name_fr' => 'nullable|string|max:200',
            'name_na' => 'nullable|string|max:200',
            'description_it' => 'required|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_na' => 'nullable|string',
        ]);

        $itineraries = Itineraries::FindOrFail($id);

        $itineraries->name_it = $request->input('name_it');
        $itineraries->name_en = $request->input('name_en');
        $itineraries->name_fr = $request->input('name_fr');
        $itineraries->name_na = $request->input('name_na');
        $itineraries->description_it = $request->input('description_it');
        $itineraries->description_en = $request->input('description_en');
        $itineraries->description_fr = $request->input('description_fr');
        $itineraries->description_na = $request->input('description_na');

        $itineraries->save();
        return response()->json($itineraries, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Itineraries $itineraries)
    {
        $itineraries->delete();
        return response()->json(['message' => 'Itinerario eliminato con successo'],200);
    }
}
