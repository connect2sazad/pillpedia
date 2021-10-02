<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Medicine;
use App\Models\User;

class DataExchange extends Controller
{
    function searchFor(Request $req){

        $medicine = Medicine::where('name', 'LIKE', '%'.$req->find.'%')->get();

        return $medicine;
    }

    function getMedDetails(Request $req){

        $medicine = Medicine::where('med_id', $req->med_id)->first();

        return $medicine;
    }

    function getAllPills(Request $req){

        $user = User::where('remember_token', $req->input('remember_token'))->first();
        $result = array();
        if (!$user) {
            $result['status'] = 0;
            $result['returned'] = $req->input('remember_token');
            $result['err_message'] = "Access Denied! You don't have permission to access these data!";
        } else {
            $result['status'] = 1;
            $all_pill = Medicine::all();
            return $all_pill;
        }

        return $result;
    }
}
