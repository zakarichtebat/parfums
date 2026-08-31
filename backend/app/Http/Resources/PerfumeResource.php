<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PerfumeResource extends JsonResource
{
    /** Format JSON consomme par le composant React <ProductCard />. */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'price'       => (float) $this->price,
            'old_price'   => (float) $this->old_price,
            'rating'      => (float) $this->rating,
            'image_url'   => $this->image_url,
            'is_on_sale'  => (bool) $this->is_on_sale,
            'discount'    => $this->discount,
        ];
    }
}
