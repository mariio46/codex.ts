<?php

namespace App\Http\Middleware\HasRole;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Operator
{
    public function handle(Request $request, Closure $next): Response
    {
        return $request->user()->hasRole('operator') ? $next($request) : abort(403);
    }
}
