<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stop;
use App\Http\Requests\StoreStopRequest;
use App\Http\Requests\UpdateStopRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stops = Stop::all();
        return response()->json($stops);
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
    public function store(StoreStopRequest $request)
    {
        $data = $request->all();
        error_log('Request Data: ' . print_r($data, true));

        $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:200',
            'image' => 'nullable|string',
            'phone' => 'nullable|string',
            'url' => 'nullable|string|max:800',
            'description_it' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_na' => 'nullable|string',
        ]);

        $file_path = $request['image'] ? Storage::put('/stops', $request['image']) : null;
        $stop = Stop::create($request->all());

        if($request->hasFile('image')){
            $stop->image = $request->file('image')->store('stops', 'public');
        }


        $stop->save();

        return response()->json($stop, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stop = Stop::with('guides', 'categories', 'rates')->find($id);
        if(!$stop){
            return response(['message' => 'Not found'], 404);
        }
        return [
            'data' => $stop
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $stop = Stop::FindOrFail($id);
        
        return response()->json([
            'status' => 200,
            'stop' => $stop
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        error_log('Request Data: ' . print_r($data, true));
        error_log('Id Data: ', $id);
        
        $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:200',
            'image' => 'nullable|string',
            'phone' => 'nullable|string',
            'url' => 'nullable|string|max:800',
            'description_it' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_na' => 'nullable|string',
            'category:id' => 'nullable|exists:categories,id'
        ]);

        // if($request->fails()){
        //     return response()->json(['error' => $validator->messages()], 422);
        // }
        $stop = Stop::findOrFail($id);

        if($request->hasFile('image')){
            $stop->image = $request->file('image')->store('stops', 'public');
        }

        $stop->name = $request->input('name');
        $stop->location = $request->input('location');
        // $stop->image = $data['image'] ?? $stop->image;
        $stop->phone = $request->input('phone');
        $stop->url = $request->input('url');
        $stop->description_it = $request->input('description_it');
        $stop->description_en = $request->input('description_en');
        $stop->description_fr = $request->input('description_fr');
        $stop->description_na = $request->input('description_na');
        
        if($request->hasFile('image')){
            $stop->image = $request->file('image')->store('stops', 'public');  
        }
        
        $stop->save();

        return response()->json($stop, 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stop $stop)
    {
        
        $stop->delete();

        return redirect()->route('stops.index');
    }

    public function assignCategory(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id'
        ]);

        $stop = Stop::findOrFail($id);
        $category = Category::findOrFail($request->category_id);

        if($stop->categories()->where('category_id', $category->id)->exists()){
            return response()->json(['message' => 'Categoria già assegnata'], 400);
        }

        $stop->categories()->attach($category);

        return response()->json(['message' => 'Categoria assegnata correttamente'], 200);
    }


}
