<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;

class HealthCheckController extends Controller
{
    public function index(Request $request) {
        $ret["status"] = 200;
        return response()->json($ret);
    }
}
