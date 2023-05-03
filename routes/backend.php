<?php

// UPDATE `person` SET `cell_phone`='+923224063901' WHERE person_id = '911C1660-CC50-4AFA-AD0C-B129CF8C7523';

Route::get('/truncate/all','Backend\MigrateController@truncate');
Route::get('/truncate/media','Backend\MigrateController@truncateMedia');

Route::get('/helpers','Backend\HelpersController@helpers');

Route::post('/setup/roles/save','Backend\Setup\SetupRolesController@save');
Route::post('/setup/roles/edit','Backend\Setup\SetupRolesController@edit');
Route::post('/setup/roles/get','Backend\Setup\SetupRolesController@get');
Route::put('/setup/roles','Backend\Setup\SetupRolesController@update');
Route::put('/setup/roles/bulk-action','Backend\Setup\SetupRolesController@bulkAction');
Route::get('/setup/roles/permissions-allow/get','Backend\Setup\SetupRolesController@getPermissions');
Route::get('/setup/roles/get','Backend\Setup\SetupRolesController@getRoles');

Route::post('/setup/permissions/save','Backend\Setup\SetupPermissionsController@save');
Route::post('/setup/permissions/edit','Backend\Setup\SetupPermissionsController@edit');
Route::post('/setup/permissions/get','Backend\Setup\SetupPermissionsController@get');
Route::put('/setup/permissions','Backend\Setup\SetupPermissionsController@update');
Route::put('/setup/permissions/bulk-action','Backend\Setup\SetupPermissionsController@bulkAction');
Route::get('/setup/permissions/get','Backend\Setup\SetupPermissionsController@getPermissions');

Route::post('/setup/permissions-allow/save','Backend\Setup\SetupPermissionsAllowsController@save');
Route::post('/setup/permissions-allow/edit','Backend\Setup\SetupPermissionsAllowsController@edit');
Route::post('/setup/permissions-allow/get','Backend\Setup\SetupPermissionsAllowsController@get');
Route::put('/setup/permissions-allow','Backend\Setup\SetupPermissionsAllowsController@update');
Route::put('/setup/permissions-allow/order-by','Backend\Setup\SetupPermissionsAllowsController@updateOrderBy');
Route::put('/setup/permissions-allow/bulk-action','Backend\Setup\SetupPermissionsAllowsController@bulkAction');

Route::post('/setup/socials/save','Backend\Setup\SetupSocialsController@save');
Route::post('/setup/socials/edit','Backend\Setup\SetupSocialsController@edit');
Route::post('/setup/socials/get','Backend\Setup\SetupSocialsController@get');
Route::put('/setup/socials','Backend\Setup\SetupSocialsController@update');
Route::put('/setup/socials/order-by','Backend\Setup\SetupSocialsController@updateOrderBy');
Route::put('/setup/socials/bulk-action','Backend\Setup\SetupSocialsController@bulkAction');
Route::get('/setup/socials/get','Backend\Setup\SetupSocialsController@getSocials');

Route::post('/users/save','Backend\UsersController@save');
Route::post('/users/edit','Backend\UsersController@edit');
Route::post('/users/{userRoleType}/get','Backend\UsersController@get');
Route::put('/users','Backend\UsersController@update');
Route::put('/users/bulk-action','Backend\UsersController@bulkAction');
Route::get('/users/get','Backend\UsersController@getUsers');

Route::put('/profile','Backend\UsersController@updateProfile');
Route::put('/profile/password','Backend\UsersController@updateProfilePassword');
Route::put('/profile/socials','Backend\UsersController@updateProfileSocials');
Route::get('/profile','Backend\UsersController@getProfile');

Route::get('/settings','Backend\SettingsController@getSettings');
Route::put('/settings','Backend\SettingsController@update');
Route::get('/app-settings','Backend\SettingsController@getAppSettings');

Route::put('/users/password','Backend\UsersController@updatePassword');
Route::get('/users/permissions','Backend\UsersController@getUserPermissions');

Route::post('/upload/add','Backend\FileManagerController@add');
Route::post('/upload','Backend\FileManagerController@get');











Route::post('/doctors/save','Backend\DoctorsController@save');
Route::post('/doctors/edit','Backend\DoctorsController@edit');
Route::post('/doctors/get','Backend\DoctorsController@get');
Route::put('/doctors','Backend\DoctorsController@update');
Route::put('/doctors/order-by','Backend\DoctorsController@updateOrderBy');
Route::put('/doctors/bulk-action','Backend\DoctorsController@bulkAction');

Route::post('/main-tests/save','Backend\MainTestsController@save');
Route::post('/main-tests/edit','Backend\MainTestsController@edit');
Route::post('/main-tests/get','Backend\MainTestsController@get');
Route::put('/main-tests','Backend\MainTestsController@update');
Route::put('/main-tests/order-by','Backend\MainTestsController@updateOrderBy');
Route::put('/main-tests/bulk-action','Backend\MainTestsController@bulkAction');
// Route::get('/main-tests/get','Backend\MainTestsController@getTemplateVariables');

Route::post('/sub-tests/save','Backend\SubTestsController@save');
Route::post('/sub-tests/edit','Backend\SubTestsController@edit');
Route::post('/sub-tests/get','Backend\SubTestsController@get');
Route::put('/sub-tests','Backend\SubTestsController@update');
Route::put('/sub-tests/order-by','Backend\SubTestsController@updateOrderBy');
Route::put('/sub-tests/bulk-action','Backend\SubTestsController@bulkAction');
// Route::get('/sub-tests/get','Backend\SubTestsController@getTemplateVariables');

Route::post('/sub-tests-details/save','Backend\SubTestsDetailsController@save');
Route::post('/sub-tests-details/edit','Backend\SubTestsDetailsController@edit');
Route::post('/sub-tests-details/get','Backend\SubTestsDetailsController@get');
Route::put('/sub-tests-details','Backend\SubTestsDetailsController@update');
Route::put('/sub-tests-details/order-by','Backend\SubTestsDetailsController@updateOrderBy');
Route::put('/sub-tests-details/bulk-action','Backend\SubTestsDetailsController@bulkAction');


Route::post('/patients/save','Backend\PatientsController@save');
Route::post('/patients/check','Backend\PatientsController@checkPatient');
Route::put('/patients/bulk-action','Backend\PatientsController@bulkAction');
Route::post('/patients/edit','Backend\PatientsController@edit');

Route::post('/patients/get','Backend\PatientsController@get');
Route::put('/patients','Backend\PatientsController@update');

Route::post('/cases/save','Backend\CaseController@save');
Route::post('/cases/edit','Backend\CaseController@edit');
Route::post('/cases/get','Backend\CaseController@get');
Route::put('/cases','Backend\CaseController@update');
Route::put('/cases/bulk-action','Backend\CaseController@bulkAction');
Route::post('/cases/payment','Backend\CaseController@payment');
Route::delete('/cases/payment/{id}','Backend\CaseController@paymentDelete');

// Route::get('/get/patients','Backend\PatientsController@get');

Route::get('/get/reporting-times','Backend\ReportingTimingsController@get');
Route::get('/get/genders','Backend\GendersController@get');
Route::get('/get/human-lifespans','Backend\HumanLifespansController@get');
Route::get('/get/reffers','Backend\ReffersController@get');
Route::get('/get/sample-locations','Backend\SampleLocationController@get');
Route::post('/get/tests','Backend\TestController@getTests');
// Route::post('/get/selected-tests','Backend\TestController@getSelectedTests');
