<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /** Public: only published, newest first */
    public function index()
    {
        $articles = Article::where('is_published', true)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get();

        return response()->json($articles);
    }

    /** Public: single article by ID (increment views) */
    public function show($id)
    {
        $article = Article::findOrFail($id);
        $article->increment('views');
        return response()->json($article);
    }

    /** Admin: all articles (incl. drafts) */
    public function adminIndex()
    {
        $articles = Article::orderByDesc('id')->get();
        return response()->json($articles);
    }

    /** Admin: create */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tag'               => 'nullable|string|max:100',
            'title'             => 'required|string|max:255',
            'cover_url'         => 'nullable|string',
            'read_time'         => 'nullable|string|max:50',
            'author_name'       => 'nullable|string|max:100',
            'author_role'       => 'nullable|string|max:100',
            'author_avatar_url' => 'nullable|string',
            'content'           => 'nullable|array',
            'content.*.type'    => 'required|string|in:lead,paragraph,heading,quote',
            'content.*.text'    => 'required|string',
            'content.*.author'  => 'nullable|string',
            'is_published'      => 'boolean',
        ]);

        if (!empty($validated['is_published']) && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $article = Article::create($validated);

        return response()->json(['message' => 'Artikel berhasil dibuat.', 'data' => $article], 201);
    }

    /** Admin: update */
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'tag'               => 'nullable|string|max:100',
            'title'             => 'required|string|max:255',
            'cover_url'         => 'nullable|string',
            'read_time'         => 'nullable|string|max:50',
            'author_name'       => 'nullable|string|max:100',
            'author_role'       => 'nullable|string|max:100',
            'author_avatar_url' => 'nullable|string',
            'content'           => 'nullable|array',
            'content.*.type'    => 'required|string|in:lead,paragraph,heading,quote',
            'content.*.text'    => 'required|string',
            'content.*.author'  => 'nullable|string',
            'is_published'      => 'boolean',
        ]);

        // Auto-set published_at when first publishing
        if (!empty($validated['is_published']) && !$article->is_published) {
            $validated['published_at'] = now();
        }

        $article->update($validated);

        return response()->json(['message' => 'Artikel berhasil diperbarui.', 'data' => $article]);
    }

    /** Admin: delete */
    public function destroy($id)
    {
        $article = Article::findOrFail($id);

        if ($article->cover_url && !str_starts_with($article->cover_url, 'http')) {
            Storage::disk('public')->delete($article->cover_url);
        }
        if ($article->author_avatar_url && !str_starts_with($article->author_avatar_url, 'http')) {
            Storage::disk('public')->delete($article->author_avatar_url);
        }

        $article->delete();

        return response()->json(['message' => 'Artikel berhasil dihapus.']);
    }

    /** Admin: upload cover image */
    public function uploadCover(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        $path = $request->file('image')->store('articles', 'public');

        return response()->json(['path' => $path, 'url' => '/storage/' . $path]);
    }
}
