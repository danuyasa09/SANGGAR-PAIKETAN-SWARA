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
        $type = $request->input('type', 'photo');

        if ($type === 'video') {
            $request->validate([
                'title'     => 'nullable|string|max:255',
                'category'  => 'nullable|string|max:100',
                'video_url' => 'required|string',
                'views'     => 'nullable|string|max:50',
                'image'     => 'nullable|image|max:3072',
            ]);

            // Thumbnail is optional for video
            $path = null;
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('galleries', 'public');
            }

            $gallery = Gallery::create([
                'image_path' => $path,
                'title'      => $request->title,
                'category'   => $request->category ?? 'general',
                'type'       => 'video',
                'video_url'  => $request->video_url,
                'views'      => $request->views,
            ]);
        } else {
            $request->validate([
                'image'    => 'required|image|max:3072',
                'title'    => 'nullable|string|max:255',
                'category' => 'nullable|string|max:100',
            ]);

            $path = $request->file('image')->store('galleries', 'public');

            $gallery = Gallery::create([
                'image_path' => $path,
                'title'      => $request->title,
                'category'   => $request->category ?? 'general',
                'type'       => 'photo',
            ]);
        }

        return response()->json($gallery, 201);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        if ($gallery->image_path && Storage::disk('public')->exists($gallery->image_path)) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $gallery->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
