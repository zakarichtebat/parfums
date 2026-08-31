<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfume extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'old_price',
        'rating',
        'image_url',
        'is_on_sale',
    ];

    protected $casts = [
        'price'      => 'float',
        'old_price'  => 'float',
        'rating'     => 'float',
        'is_on_sale' => 'boolean',
    ];

    /** Pourcentage de remise calcule (non stocke en base). */
    public function getDiscountAttribute(): int
    {
        if (! $this->old_price || $this->old_price <= $this->price) {
            return 0;
        }

        return (int) round((($this->old_price - $this->price) / $this->old_price) * 100);
    }

    /** Scope : uniquement les parfums en promotion. */
    public function scopeOnSale($query)
    {
        return $query->where('is_on_sale', true);
    }
}
