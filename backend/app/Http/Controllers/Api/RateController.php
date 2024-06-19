<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use App\Http\Requests\StoreRateRequest;
use App\Http\Requests\UpdateRateRequest;
use App\Models\Stop;
use Illuminate\Http\Request;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $stopId)
    {
        $rates = Rate::where('stop_id', $stopId)->with('user')->get();
        
        return response()->json($rates->map(function ($rate){
            return[
                'id' => $rate->id,
                'rate' => $rate->rate,
                'comment' => $rate->comment,
                'username' => $rate->user->name,
                'profile_img' => $rate->user->profile_img
            ];
        }));
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
    public function store(Request $request, $stopId)
    {
        $rate = new Rate();
        $rate->stop_id = $stopId;
        $rate->user_id = auth()->user()->id;
        $rate->comment = $request->input('comment');
        $rate->rate = $request->input('rate');
        $rate->save();

        // return response()->json(['message'=> 'Commento aggiunto con successo', 201]);
        return response()->json([
            'id' => $rate->id,
            'rate' => $rate->rate,
            'comment' => $rate->comment,
            'username' => $rate->user->name,
            'profile_img' => $rate->user->profile_img,
            'message'=> 'Commento aggiunto con successo', 
            'status' => 201
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Rate $rate)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rate $rate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRateRequest $request, Rate $rate)
    {
        $rate->comment = $request->input('comment');
        $rate->rate = $request->input('rate');
        $rate->save();

        return response()->json(['message'=>'Commento modificato con successo', 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($stopId, $commentId)
    {
      $rate = Rate::where('stop_id', $stopId)->where('id', $commentId)->where('user_id', auth()->user()->id)->first();

      if($rate){
        $rate->delete();
        return response()->json(['message'=>'Commento eliminato con successo', 201]);
      }else{
        return response()->json(['message'=>'Non hai il permesso di eliminare questo commento', 404]);
      }
    }
}
