<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;



class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Area::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{

    $request->validate(['name' => 'required|string|max:255']);

    $area = Area::create(['name' => $request->name]);

    return response()->json($area);
}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    $area = Area::findOrFail($id);

    return response()->json([
        'area' => $area
    ], 200);

    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $area = Area::findOrFail($id);

    $area->update(['name' => $request->name]);

    return response()->json($area);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Area::findOrFail($id)->delete();
        return response()->json(['message' => 'تم الحذف ']);

    }
}
