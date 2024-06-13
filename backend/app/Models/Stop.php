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

    public function categories(): BelongsToMany{
        return $this->belongsToMany(Category::class, 'category_stop', 'stop_id', 'category_id');
    }

    protected $fillable = [
        'name',
        'location', 
        'image',
        'image2',
        'image3',
        'image4',
        'phone',
        'url',
        'description_it',
        'description_en',
        'description_fr',
        'description_na',
        
    ];
}
