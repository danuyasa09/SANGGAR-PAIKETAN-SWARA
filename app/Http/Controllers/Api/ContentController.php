<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\WebsiteContent;

class ContentController extends Controller
{
    public function index()
    {
        return response()->json(WebsiteContent::all());
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'contents' => 'required|array',
            'contents.*.key' => 'required|string',
            'contents.*.value' => 'nullable|string',
        ]);

        foreach ($data['contents'] as $item) {
            WebsiteContent::updateOrCreate(
                ['key' => $item['key']],
                ['value' => $item['value']]
            );
        }

        return response()->json(['message' => 'Content updated successfully']);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('contents', 'public');
        
        return response()->json(['path' => $path]);
    }
}
