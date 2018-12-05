<?php

Route::group([
    'middleware' => 'auth:api',
    'namespace' => 'GitUser',
    'prefix' => 'github'
    ], function() {
        Route::get('list/{since}', 'GitUserController@list');
        Route::get('get/{username}', 'GitUserController@get');
        Route::post('rate/', 'GitUserController@rate');
});
