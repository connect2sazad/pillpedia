<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserController extends Controller
{
    function pillpediaLogin(Request $req){
        $user = User::where('email', $req->input('email'))->first();
        $result = array();
        if (!$user || !Hash::check($req->password, $user->password)) {
            $result['status'] = 0;
        } else {
            $result['status'] = 1;
            $auth = new UserController;
            $token = $auth->createAndReturnToken($req->input('email'), 'admin');
            $result['token'] = $token['token'];
            $result['token_creation_timestamp'] = $token['token_creation_timestamp'];
        }

        return $result;
    }

    function createAndReturnToken($email, $salt)
    {

        date_default_timezone_set("Asia/Kolkata");

        $token_creation_timestamp = date("Ymdhis");
        $datetime = md5($token_creation_timestamp);

        $prepared_token = $datetime . md5($email) . md5($salt);

        $customer = User::where('email', $email)->first(); // individual_id is the token name

        $data = array();

        if (!is_null($customer)) {
            $customer->remember_token = $prepared_token;
            if ($customer->save()) {
                $data['status'] = 1;
                $data['token_remembered'] = 'token_remembered';
                $data['token_creation_timestamp'] = date('Y-m-d h:i:s a');
                $data['token'] = $prepared_token;
            } else {
                $data['status'] = 0;
                $data['token_remembered'] = 'token_not_remembered';
                $data['token'] = 0;
            }
        } else {
            $data['status'] = 0;
            $data['token_remembered'] = 'token_not_remembered';
            $data['token'] = null;
        }

        return $data;
    }
}
