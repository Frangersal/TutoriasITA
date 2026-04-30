<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model {
    use HasFactory;
    protected $fillable = ['name', 'initials', 'description'];

    // Una carrera tiene muchos usuarios
    public function users() {
        return $this->hasMany(User::class);
    }
}