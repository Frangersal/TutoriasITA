<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'control_number',
        'picture',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_confirmed_at' => 'datetime',
    ];

    /**
     * Relación con el modelo Role
     * Un usuario pertenece a un rol
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Relación muchos a muchos con Forms (Formularios completados)
    public function completedForms()
    {
        return $this->belongsToMany(Form::class, 'form_users', 'user_id', 'form_id')->withTimestamps();
    }

    public function tutor()
    {
        return $this->hasOne(Tutor::class);
    }

    public function pupil()
    {
        return $this->hasOne(Pupil::class);
    }

    /**
     * Comprueba si el usuario tiene un rol concreto.
     */
    public function hasRole(string $role): bool
    {
        $current = optional($this->role)->name;
        if (!$current) {
            return false;
        }

        return mb_strtolower($current) === mb_strtolower($role);
    }

    /**
     * Comprueba si el usuario tiene alguno de los roles pasados.
     * Acepta array de nombres de rol.
     *
     * @param array $roles
     */
    public function hasAnyRoles(array $roles): bool
    {
        $current = optional($this->role)->name;
        if (!$current) {
            return false;
        }

        $current = mb_strtolower($current);
        foreach ($roles as $r) {
            if ($current === mb_strtolower($r)) {
                return true;
            }
        }

        return false;
    }

}
