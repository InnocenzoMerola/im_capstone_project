<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // $response = $next($request);

        // $response->headers->set('Access-Control-Allow-Origin', env('FRONTEND_URL'));
        // $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // $response->headers->set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

        // if($request->isMethod('OPTIONS')){
        //     $response->setStatusCode(200);
        // }

        // return $response;
        }
}
