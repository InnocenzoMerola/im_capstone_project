<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stop;
use App\Http\Requests\StoreStopRequest;
use App\Http\Requests\UpdateStopRequest;
use App\Models\Category;
use Illuminate\Http\Request;

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
    public function edit(Stop $stop)
    {
        $stops = Stop::all();
        return response()->json($stops);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStopRequest $request, $id)
    {
        $data = $request->all();
        // if($request->hasFile('image')){
        //     $data->image = $request->file('image')->store('stops', 'public');  
        // }

        $stop = Stop::findOrFail($id);
        $stop->name = $data['name'];
        $stop->location = $data['location'];
        $stop->image = $data['image'];
        $stop->phone = $data['phone'];
        $stop->url = $data['url'];
        $stop->description_it = $data['description_it'];
        $stop->description_en = $data['description_en'];
        $stop->description_fr = $data['description_fr'];
        $stop->description_na = $data['description_na'];
        $stop->save();

        return redirect()->route('stops.index', ['id' => $stop->id]);

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
