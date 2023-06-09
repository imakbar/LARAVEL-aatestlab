/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	config.allowedContent = true;
	config.extraAllowedContent = 'div(*)';
	config.extraAllowedContent = 'div(col-md-*,container-fluid,row)';
	config.extraAllowedContent = 'dl; dt dd[dir]';
	config.extraAllowedContent = '*(*);*{*}';
	config.extraAllowedContent = '*[id]';
	config.extraAllowedContent = 'style';
	config.extraAllowedContent = 'span;ul;li;table;td;style;*[id];*(*);*{*}';
	

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';




	config.filebrowserBrowseUrl = '/plugins/kcfinder-3.12/browse.php?opener=ckeditor&type=files';

    config.filebrowserImageBrowseUrl = '/plugins/kcfinder-3.12/browse.php?opener=ckeditor&type=images';

    config.filebrowserFlashBrowseUrl = '/plugins/kcfinder-3.12/browse.php?opener=ckeditor&type=flash';

    config.filebrowserUploadUrl = '/plugins/kcfinder-3.12/upload.php?opener=ckeditor&type=files';

    config.filebrowserImageUploadUrl = '/plugins/kcfinder-3.12/upload.php?opener=ckeditor&type=images';

    config.filebrowserFlashUploadUrl = '/plugins/kcfinder-3.12/upload.php?opener=ckeditor&type=flash';


};
