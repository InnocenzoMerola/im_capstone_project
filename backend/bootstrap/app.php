<?php

use Dotenv\Dotenv;
use Illuminate\Foundation\Application;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;


    // $envFile = '.env';

    // if (file_exists(__DIR__ . '/../.env') && getenv('APP_ENV') === 'local') {
    //     $envFile = '.env';
    // } elseif (file_exists(__DIR__ . '/../.env.production') && getenv('APP_ENV') === 'production') {
    //     $envFile = '.env.production';
    // }

    // // Carica le variabili di ambiente dal file .env corretto
    // $dotenv = Dotenv::createImmutable(__DIR__ . '/../', $envFile);
    // $dotenv->load();

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);

        $middleware->alias([
            'admin' => AdminMiddleware::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
