<?php

if (! function_exists('sessionFlash')) {
    function sessionFlash($title, $message, $status = 'success', $icon = 'IconCheck', $className = 'text-green-500'): void
    {
        session()->flash('status', $status);
        session()->flash('title', $title);
        session()->flash('message', $message);
        session()->flash('icon', $icon);
        session()->flash('className', $className);
    }
}

if (! function_exists('firstName')) {
    function firstName($string): string
    {
        $string = str()->of($string)->explode(' ')->get(0);

        return $string;
    }
}

if (! function_exists('getFirstName')) {
    function getFirstName($string): string
    {
        $string = str()->of(strtolower($string))->explode(' ')->get(0);

        return $string;
    }
}

if (! function_exists('firstWord')) {
    function firstWord($string): string
    {
        $string = explode(' ', trim($string));

        return $string[0];
    }
}

if (! function_exists('acronym')) {
    function acronym($string): string
    {
        $words = explode(' ', $string);
        $acronym = '';

        foreach ($words as $word) {
            $acronym .= $word[0];
        }

        return $acronym;
    }
}
