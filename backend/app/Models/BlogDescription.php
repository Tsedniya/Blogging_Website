<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogDescription extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'description'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}