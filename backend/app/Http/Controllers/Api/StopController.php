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
            'image' => 'nullable|file|image|max:2048',
            'image2' => 'nullable|file|image|max:2048',
            'image3' => 'nullable|file|image|max:2048',
            'image4' => 'nullable|file|image|max:2048',
            'phone' => 'nullable|string',
            'url' => 'nullable|string|max:800',
            'description_it' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_sp' => 'nullable|string',
            'description_na' => 'nullable|string',
        ]);

        $stop = new Stop([
            'name' => $request->input('name'),
            'location' => $request->input('location'),
            'phone' => $request->input('phone'),
            'url' => $request->input('url'),
            'description_it' => $request->input('description_it'),
            'description_en' => $request->input('description_en'),
            'description_fr' => $request->input('description_fr'),
            'description_sp' => $request->input('description_sp'),
            'description_na' => $request->input('description_na'),
            'categories' => $request->input('categories'),
        ]);

        if($request->hasFile('image')){
            $stop->image = $request->file('image')->store('stops', 'public');
        }
        if($request->hasFile('image2')){
            $stop->image2 = $request->file('image2')->store('stops', 'public');
        }
        if($request->hasFile('image3')){
            $stop->image3 = $request->file('image3')->store('stops', 'public');
        }
        if($request->hasFile('image4')){
            $stop->image4 = $request->file('image4')->store('stops', 'public');
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
        $stop = Stop::with('categories')->FindOrFail($id);
        
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
        // error_log('Request Data: ' . print_r($data, true));
        // error_log('Id Data: ', $id);
        
        $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:200',
            'image' => 'nullable|file|image|max:2048',
            'image2' => 'nullable|file|image|max:2048',
            'image3' => 'nullable|file|image|max:2048',
            'image4' => 'nullable|file|image|max:2048',
            'phone' => 'nullable|string',
            'url' => 'nullable|string|max:800',
            'description_it' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_sp' => 'nullable|string',
            'description_na' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id'
        ]); 

      
        $stop = Stop::findOrFail($id);
        
        $stop->name = $request->input('name');
        $stop->location = $request->input('location');
        $stop->phone = $request->input('phone');
        $stop->url = $request->input('url');
        $stop->description_it = $request->input('description_it');
        $stop->description_en = $request->input('description_en');
        $stop->description_fr = $request->input('description_fr');
        $stop->description_sp = $request->input('description_sp');
        $stop->description_na = $request->input('description_na');
     

        if($request->hasFile('image')){
            $stop->image = $request->file('image')->store('stops', 'public');  
        }
        if($request->hasFile('image2')){
            $stop->image2 = $request->file('image2')->store('stops', 'public');  
        }
        if($request->hasFile('image3')){
            $stop->image3 = $request->file('image3')->store('stops', 'public');  
        }
        if($request->hasFile('image4')){
            $stop->image4 = $request->file('image4')->store('stops', 'public');  
        }
        
        if($request->has('category_id')){
           $category = Category::FindOrFail($request->input('category_id'));
           $stop->categories()->sync([$category->id]);
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

        return response()->json(['message' => 'Luogo eliminato con successo'], 200);
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
