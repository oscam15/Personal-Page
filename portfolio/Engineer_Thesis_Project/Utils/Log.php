<?php
/**
 * Created by PhpStorm.
 * User: cuculcan
 * Date: 01/11/2016
 * Time: 10:51 PM
 */

namespace App\Utils;


class Log
{
    public static function error($msg)
    {
        self::log('php://stderr', $msg);
    }

    private static function log($file, $msg)
    {
        if ($msg instanceof \stdClass || is_array($msg)) {
            $msg = print_r($msg, true);
        }
        file_put_contents($file, date("h:i:sa")." $msg ".PHP_EOL);
    }

    public static function debug($msg)
    {
        self::log('php://stdout', $msg);
    }
}