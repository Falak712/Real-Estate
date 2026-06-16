<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RealEstateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'price' => $this->price,
            'description' => $this->description,
            'size' => $this->size,
            'direction' => $this->direction,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'address' => $this->address,
            'type_real_estate' => $this->type_real_estate,
            'contract_type' => $this->contract_type,
            'status_real_estate' => $this->status_real_estate,
            'order_status' => $this->order_status,

            // العلاقات
            'area' => new AreaResource($this->whenLoaded('area')),
            'pictures' => PictureResource::collection($this->whenLoaded('pictures')),
            'owner' => new UserResource($this->whenLoaded('user')),
        ];
    }
}