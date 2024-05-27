<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stop extends Model
{
    use HasFactory;

    public function rates(): HasMany{
        return $this->hasMany(Rate::class);
    }

    public function guides(): BelongsToMany{
        return $this->belongsToMany(Guide::class);
    }
}
