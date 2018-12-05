<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Storage;
use Avatar;
use App\Notifications\SignupActivate;
use App\Notifications\SignupActivated;
use App\User;

class UserController extends Controller
{
    /**
     * Get user information
     *
     * @param  [string] name
     * @return \Illuminate\Http\JsonResponse
     */
    public function user($id){
        $user = User::query()->where('id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => __('auth.user_not_found')
            ], 404);
        }
        return response()->json($user);
    }

    /**
     * Get the authenticated User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse [json] user object
     */
    public function current(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Get all users from database
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse [json] user object
     */
    public function list(Request $request)
    {
        //Get all users
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Update a specific user
     *
     * @param  [string] name
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request){

        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::query()->where('id', $id)->first();
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        $user->save();

        return response()->json($user);
    }
}
