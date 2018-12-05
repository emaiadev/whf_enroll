<?php

Route::group([
    'middleware' => 'auth:api',
    'namespace' => 'User',
    'prefix' => 'user'
    ], function() {
        Route::get('current', 'UserController@current');
        Route::get('get/{id}', 'UserController@user');
        Route::get('list', 'UserController@list');
        Route::put('update/{id}', 'UserController@update');
});
