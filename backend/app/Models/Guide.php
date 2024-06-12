<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guide extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_it' ,
        'name_en',
        'name_fr',
        'name_na',
        'date' ,
        'price' ,
        'mobility',
        'duration',
    ];

    public function users(): BelongsToMany{
        return $this->belongsToMany(User::class);
    }

    public function stops(): BelongsToMany{
        return $this->belongsToMany(Stop::class);
    }

    public function slots(): BelongsToMany{
        return $this->belongsToMany(Slot::class);
    }
}
