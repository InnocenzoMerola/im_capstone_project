<?php
namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfTokenApi extends Middleware
{
    /**
     * I percorsi che non devono passare attraverso la verifica CSRF.
     *
     * @var array
     */
    protected $except = [
        'api/*', // Esempio: tutte le rotte API
    ];
}