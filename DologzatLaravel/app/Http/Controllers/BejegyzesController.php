<?php

namespace App\Http\Controllers;

use App\Models\Bejegyzes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BejegyzesController extends Controller
{
    function all(){
        return DB::table('bejegyzes as b')
        ->join('tevekenysegs as t', 'b.tevekenyseg_id', 't.tevekenyseg_id')
        ->select('nev', 'pontszam', 'osztaly_id', 'allapot')
        ->get();
    }

    function adottBejegyzes($osztaly){
        return DB::table('bejegyzes as b')
        ->join('tevekenysegs as t', 'b.tevekenyseg_id', 't.tevekenyseg_id')
        ->select('nev', 'pontszam', 'osztaly_id')
        ->where('osztaly_id', '=', $osztaly)
        ->get();
    }

    function newBejegyzes(Request $request){
        $be = new Bejegyzes();
        $be->tevekenyseg_id = $request->tevekenyseg_id;
        $be->osztaly_id = $request->osztaly_id;
        $be->allapot = $request->allapot;
        $be->save();
    }
}
