<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('children.stops', 'stops')->whereNull('parent_id')->get();
       
        // $translatedCategories = $categories->map(function ($category){
        //     return [
        //         'id' => $category->id,
        //         'name' => $category->{'name_' . app()->getLocale()},
        //         'children' => $category->children->map(function ($child){
        //             return[
        //                 'id' => $child->id,
        //                 'name' => $child->{'name_' . app()->getLocale()},
        //             ];
        //         }),
        //     ];
        // });

        // return response()->json($translatedCategories);
    return $categories;
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
    public function store(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::with('stops')->find($id);
        if(!$category){
            return response(['message' => 'Not found'], 404);
        }
        return [
            'data' => $category
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
