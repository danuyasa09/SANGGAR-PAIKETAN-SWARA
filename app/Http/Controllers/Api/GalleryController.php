<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json(Gallery::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
            'title' => 'nullable|string',
            'category' => 'nullable|string'
        ]);

        $path = $request->file('image')->store('galleries', 'public');

        $gallery = Gallery::create([
            'image_path' => $path,
            'title' => $request->title,
            'category' => $request->category ?? 'general'
        ]);

        return response()->json($gallery, 201);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        if (Storage::disk('public')->exists($gallery->image_path)) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $gallery->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
