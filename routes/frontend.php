<?php

Route::get('/','HomeController@index');
Route::get('/receipt/{patientCaseId}', 'PdfGeneratorController@receipt');
Route::get('/resume', 'PdfGeneratorController@index');