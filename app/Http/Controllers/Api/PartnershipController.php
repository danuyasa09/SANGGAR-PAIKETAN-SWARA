<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partnership;
use Illuminate\Http\Request;

class PartnershipController extends Controller
{
    /**
     * Public: Store a new partnership submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'institution'      => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'required|string|max:50',
            'partnership_type' => 'required|string|max:100',
            'notes'            => 'nullable|string',
        ]);

        $partnership = Partnership::create($validated);

        return response()->json([
            'message' => 'Pengajuan kemitraan berhasil dikirim.',
            'data'    => $partnership,
        ], 201);
    }

    /**
     * Admin: List all partnership submissions.
     */
    public function index(Request $request)
    {
        $query = Partnership::latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $partnerships = $query->get();

        $counts = [
            'all'       => Partnership::count(),
            'pending'   => Partnership::where('status', 'pending')->count(),
            'confirmed' => Partnership::where('status', 'confirmed')->count(),
            'rejected'  => Partnership::where('status', 'rejected')->count(),
        ];

        return response()->json([
            'data'   => $partnerships,
            'counts' => $counts,
        ]);
    }

    /**
     * Admin: Update the status of a partnership.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,rejected',
        ]);

        $partnership = Partnership::findOrFail($id);
        $partnership->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status kemitraan berhasil diperbarui.',
            'data'    => $partnership,
        ]);
    }

    /**
     * Admin: Delete a partnership record.
     */
    public function destroy($id)
    {
        $partnership = Partnership::findOrFail($id);
        $partnership->delete();

        return response()->json(['message' => 'Data kemitraan berhasil dihapus.']);
    }
}
