<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itineraries extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_it',
        'name_en',
        'name_fr',
        'name_sp',
        'name_na',
        'description_it',
        'description_en',
        'description_fr',
        'description_sp',
        'description_na',
    ];
}
