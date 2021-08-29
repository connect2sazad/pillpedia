<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Medicine;

class DataExchange extends Controller
{
    function searchFor(Request $req){

        $medicine = Medicine::where('name', 'LIKE', '%'.$req->find.'%')->get();

        return $medicine;
    }
}
