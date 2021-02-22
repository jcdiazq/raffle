<?php

namespace App\Http\Controllers;

use App\Mail\SenderRegisterdMailable;
use App\Models\NumberSelection;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class NumberSelectionController extends Controller
{
    public function show() {
    $numbers  = NumberSelection::all($columns = ['number']);
    return $numbers;
    }

    public function selected_number(Request $request){
        $number = new NumberSelection();
        $number->id = (string) Str::uuid();
        $number->number = $request->number;
        $number->name = $request->name;
        $number->number_phone = $request->number_phone;
        $status = false;
        try{
            $status = $number->save();
            $status = true;
        } catch (Exception $e) {
            return response()->json(['registered'=>$status]);    
        }
        //Mail::to('jose07077@hotmail.com')->send(new SenderRegisterdMailable($number));
        return response()->json(['registered'=>$status]);
    }

    public function showAll(){
        $data = NumberSelection::all();
        return view('showall', ['dataNumbers' => $data]);
    }
}
