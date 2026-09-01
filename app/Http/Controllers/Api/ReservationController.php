<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Mail\ReservationReceived;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Public: Store a new reservation submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'phone'        => 'required|string|max:50',
            'email'        => 'required|email|max:255',
            'origin'       => 'nullable|string|max:255',
            'visit_date'   => 'required|date|after:today',
            'visit_time'   => 'nullable|string|max:100',
            'participants' => 'required|string|max:50',
            'age_group'    => 'nullable|string|max:100',
            'package_type' => 'required|string|max:100',
            'language'     => 'nullable|string|max:100',
            'notes'        => 'nullable|string',
        ]);

        $reservation = Reservation::create($validated);

        try {
            Mail::to($reservation->email)->send(new ReservationReceived($reservation));
        } catch (\Exception $e) {
            \Log::error('Gagal mengirim email reservasi: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Reservasi berhasil dikirim.',
            'data'    => $reservation,
        ], 201);
    }

    /**
     * Admin: List all reservation submissions.
     */
    public function index(Request $request)
    {
        $query = Reservation::latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $reservations = $query->get();

        $counts = [
            'all'       => Reservation::count(),
            'pending'   => Reservation::where('status', 'pending')->count(),
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'rejected'  => Reservation::where('status', 'rejected')->count(),
        ];

        return response()->json([
            'data'   => $reservations,
            'counts' => $counts,
        ]);
    }

    /**
     * Admin: Update the status of a reservation.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,rejected',
        ]);

        $reservation = Reservation::findOrFail($id);
        $oldStatus = $reservation->status;
        
        $reservation->update(['status' => $request->status]);

        if ($oldStatus !== $request->status) {
            try {
                if ($request->status === 'confirmed') {
                    \Illuminate\Support\Facades\Mail::to($reservation->email)->send(new \App\Mail\ReservationConfirmed($reservation));
                } elseif ($request->status === 'rejected') {
                    \Illuminate\Support\Facades\Mail::to($reservation->email)->send(new \App\Mail\ReservationRejected($reservation));
                }
            } catch (\Exception $e) {
                \Log::error('Gagal mengirim email status reservasi: ' . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'Status reservasi berhasil diperbarui.',
            'data'    => $reservation,
        ]);
    }

    /**
     * Admin: Delete a reservation record.
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(['message' => 'Data reservasi berhasil dihapus.']);
    }
}
