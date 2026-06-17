<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notices = Notice::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($notices, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    //انشاء للادمن 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'notification_message' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id'
        ]);
        $notice = Notice::create([
            'notification_message' => $validated['notification_message'],
            'date_message' => now(),
            'check' => false,
            'user_id' => $validated['user_id']
        ]);
        return response()->json(['تم إرسال الإشعار بنجاح', $notice], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $notice = Notice::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();
        return response()->json($notice, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $notice = Notice::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();
        $notice->delete();
        return response()->json(" تم حذف الاشعار بنجاح", 204);
    }

    public function ConfirmNotice($id)
    {
        $notice = Notice::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notice->update(['check' => true]);

        return response()->json(['تم تأكيد اشعار الطلب بنجاح', $notice], 200);
    }
}
