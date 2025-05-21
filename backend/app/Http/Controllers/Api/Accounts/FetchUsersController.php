<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class FetchUsersController extends Controller
{
    public function __invoke(): JsonResponse
    {
        // Fetch all users from the database
        $users = User::all();

        // Return the users as a JSON response
        return response()->json($users);
    }
}
