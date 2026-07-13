<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Punishment;
use App\Http\Requests\BanUserRequest;
use Illuminate\Support\Facades\Log;

class PunishmentController extends Controller
{
    public function banUser(BanUserRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // ❌ ممنوع حظر الأدمن
            if ($user->userType === 'admin') {
                return response()->json(['message' => 'لا يمكن حظر الأدمن'], 403);
            }

            // آخر عقوبة للمستخدم
            $lastPunishment = Punishment::where('user_id', $user->id)->latest()->first();

            $times = $lastPunishment ? $lastPunishment->number_of_times + 1 : 1;

            // إذا وصل 3 مرات → حظر نهائي
            $isPermanent = ($times >= 3);

            // حظر المستخدم
            $user->update(['banned' => true]);

            Punishment::create([
                'user_id' => $user->id,
                'reason' => $request->reason,
                'length_of_punishment' => (int)$request->length_of_punishment,
                'number_of_times' => $times,
                'is_permanent' => $isPermanent,
                'start_date' => now(),
                'end_date' => $isPermanent
                    ? null
                    : now()->addDays((int)$request->length_of_punishment),
            ]);

            return response()->json([
                'message' => $isPermanent
                    ? 'تم الحظر النهائي للمستخدم'
                    : 'تم حظر المستخدم بنجاح',
                'number_of_times' => $times,
                'is_permanent' => $isPermanent,
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);

        } catch (\Exception $e) {
            Log::error('Ban user error: ' . $e->getMessage());
            return response()->json(['message' => 'حدث خطأ أثناء حظر المستخدم'], 500);
        }
    }

    public function unbanUser($id)
    {
        try {
            $user = User::findOrFail($id);

            // ❌ الأدمن أصلاً ما بينحظر
            if ($user->userType === 'admin') {
                return response()->json(['message' => 'الأدمن غير محظور ولا يمكن فك الحظر عنه'], 400);
            }

            // إذا المستخدم غير محظور
            if ($user->banned == false) {
                return response()->json(['message' => 'هذا المستخدم غير محظور'], 400);
            }

            // آخر عقوبة
            $lastPunishment = Punishment::where('user_id', $user->id)->latest()->first();

            // إذا الحظر نهائي → ممنوع فك الحظر
            if ($lastPunishment && $lastPunishment->is_permanent) {
                return response()->json(['message' => 'هذا المستخدم محظور نهائياً ولا يمكن فك الحظر عنه'], 403);
            }

            // فك الحظر
            $user->update(['banned' => false]);

            return response()->json(['message' => 'تم فك الحظر بنجاح'], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);

        } catch (\Exception $e) {
            Log::error('Unban user error: ' . $e->getMessage());
            return response()->json(['message' => 'حدث خطأ أثناء فك الحظر'], 500);
        }
    }

    public function userPunishments($id)
    {
        try {
            $user = User::with('punishments')->findOrFail($id);

            return response()->json(['user' => $user], 200);

            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);
        }
    }
}