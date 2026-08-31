<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    /**
     * Public: Get all active programs ordered by 'order' column.
     */
    public function index()
    {
        $programs = Program::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json($programs);
    }

    /**
     * Admin: Get all programs (including inactive).
     */
    public function adminIndex()
    {
        $programs = Program::orderBy('order')->orderBy('id')->get();
        return response()->json($programs);
    }

    /**
     * Admin: Store a new program.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'          => 'nullable|string|max:50',
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'activities'    => 'nullable|array',
            'activities.*'  => 'string',
            'duration'      => 'nullable|string|max:100',
            'capacity'      => 'nullable|string|max:100',
            'thumbnail_url' => 'nullable|string',
            'price'         => 'nullable|string|max:100',
            'btn_label'     => 'nullable|string|max:100',
            'is_custom_btn' => 'boolean',
            'order'         => 'nullable|integer',
            'is_active'     => 'boolean',
        ]);

        $program = Program::create($validated);

        return response()->json([
            'message' => 'Program berhasil ditambahkan.',
            'data'    => $program,
        ], 201);
    }

    /**
     * Admin: Update a program.
     */
    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $validated = $request->validate([
            'code'          => 'nullable|string|max:50',
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'activities'    => 'nullable|array',
            'activities.*'  => 'string',
            'duration'      => 'nullable|string|max:100',
            'capacity'      => 'nullable|string|max:100',
            'thumbnail_url' => 'nullable|string',
            'price'         => 'nullable|string|max:100',
            'btn_label'     => 'nullable|string|max:100',
            'is_custom_btn' => 'boolean',
            'order'         => 'nullable|integer',
            'is_active'     => 'boolean',
        ]);

        $program->update($validated);

        return response()->json([
            'message' => 'Program berhasil diperbarui.',
            'data'    => $program,
        ]);
    }

    /**
     * Admin: Delete a program.
     */
    public function destroy($id)
    {
        $program = Program::findOrFail($id);

        // Remove thumbnail from storage if it's a local path
        if ($program->thumbnail_url && !str_starts_with($program->thumbnail_url, 'http')) {
            Storage::disk('public')->delete($program->thumbnail_url);
        }

        $program->delete();

        return response()->json(['message' => 'Program berhasil dihapus.']);
    }

    /**
     * Admin: Upload thumbnail image for a program.
     */
    public function uploadThumbnail(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $path = $request->file('image')->store('programs', 'public');

        return response()->json([
            'path' => $path,
            'url'  => '/storage/' . $path,
        ]);
    }
}
