<?php
namespace Illuminate\Foundation\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends Middleware
{
    /**
     * I percorsi che non devono passare attraverso la verifica CSRF.
     *
     * @var array
     */
    protected $except = [
        // 'api/*',  // Esempio: tutte le rotte API
        'login/'
    ];

    protected function tokensMatch($request)
    {
        $token = $this->getTokenFromRequest($request);

        return is_string($request->session()->token()) && 
            is_string($token) &&
            hash_equals($request->session()->token(), $token);
    }

    public function handle($request, Closure $next){
        if(
            $this->isReading($request) ||
            $this->runningUnitTests() ||
            $this->inExceptArray($request) ||
            $this->tokensMatch($request)
        ){
            return tap($next($request), function ($response) use ($request){

                if($this->shouldAddXsrfTokenCookie()){
                    $this->addCookieToResponse($response, $request);
                }
            });
        }

        throw new TokenMismatchException('CSRF token mismatch');
    }
}