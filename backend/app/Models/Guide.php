<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Guide extends Model
{
    use HasFactory;

    public function users(): BelongsToMany{
        return $this->belongsToMany(User::class);
    }

    public function stops(): BelongsToMany{
        return $this->belongsToMany(Stop::class);
    }
}
