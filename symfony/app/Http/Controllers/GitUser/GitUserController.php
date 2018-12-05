<?php

namespace App\Http\Controllers\GitUser;

use App\Http\Controllers\Controller;
use App\Rate;
use Avatar;
use Github\HttpClient\Plugin\Authentication;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Storage;

class GitUserController extends Controller
{

    /**
     * Get all users from Github API
     *
     * @param $since
     * @return \Illuminate\Http\JsonResponse [json] user object
     */
    public function list($since)
    {

        // Create a client with a base URI
        $client = new Client([
            // Base URI is used with relative requests
            'base_uri' => config('app.github_api')
        ]);
        // Send a request to https://foo.com/api/test
        $response = $client->get('/users?since=' . $since);

        $data = json_decode($response->getBody()->getContents(), true);

        return response()->json($data);
    }

    /**
     * Get user from Github API
     *
     * @param $username
     * @return \Illuminate\Http\JsonResponse [json] user object
     */
    public function get($username)
    {
        // Create a client with a base URI
        $client = new Client([
            // Base URI is used with relative requests
            'base_uri' => config('app.github_api')
        ]);
        // Send a request to https://foo.com/api/test
        $response = $client->get('/users/' . $username);

        if (strlen($response->getBody()->getContents()) == 0) {
            return response()->json([
                'message' => __('auth.login_failed')
            ], 401);
        }

        $data = json_decode($response->getBody()->getContents(), true);

        return response()->json($data);
    }

    /**
     * Evaluate Github user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function rate(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'rate' => 'required|int'
        ]);

        try {
            $rate = new Rate();
            $rate->email = $request->user()->email;
            $rate->username = $request->get("username");
            $rate->rate = $request->get("rate");
            $rate->save();
        } catch (\Exception $err) {
            return response()->json([
                'message' => __('rate.rate_success')
            ]);
        }

        return response()->json([
            'message' => __('rate.rate_success')
        ]);
    }
}
