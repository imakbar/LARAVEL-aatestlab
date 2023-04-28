<!DOCTYPE html>
<html class="loading light-layout" lang="en" data-layout="light-layout" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">
    <meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app">
    <meta name="author" content="PIXINVENT">
	
	<title>{{ appSettingGeneral()['app_name'] }} | {{ appSettingGeneral()['app_title'] }}</title>

    <link rel="apple-touch-icon" href="">
    <link rel="shortcut icon" type="image/x-icon" href="">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/vendors/css/vendors.min.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/vendors/css/charts/apexcharts.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/vendors/css/extensions/toastr.min.css"> -->
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/bootstrap.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/bootstrap-extended.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/colors.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/components.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/themes/dark-layout.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/themes/bordered-layout.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/themes/semi-dark-layout.css"> -->

	<!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/vendors/icons/simple-line-icons.css"> -->

    <!-- BEGIN: Page CSS-->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/core/menu/menu-types/vertical-menu.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/pages/dashboard-ecommerce.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/plugins/charts/chart-apex.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/plugins/extensions/ext-component-toastr.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/app-assets/css/plugins/extensions/ext-component-sweet-alerts.css"> -->
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/assets/css/style.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/backend/custom.css"> -->
    <!-- END: Custom CSS-->

</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body data-open="click" data-menu="vertical-menu-modern" data-col="">
	
	<!-- BEGIN: Content-->
	<div id="app"></div>
    <!-- END: Content-->

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Vendor JS-->
    <script src="{{url('/')}}/backend/app-assets/vendors/js/vendors.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <!-- <script src="{{url('/')}}/backend/app-assets/vendors/js/charts/apexcharts.min.js"></script> -->
    <!-- <script src="{{url('/')}}/backend/app-assets/vendors/js/extensions/toastr.min.js"></script> -->
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <!-- <script src="{{url('/')}}/backend/app-assets/js/core/app-menu.js"></script> -->
    <!-- <script src="{{url('/')}}/backend/app-assets/js/core/app.js"></script> -->
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    <!-- <script src="{{url('/')}}/backend/app-assets/js/scripts/pages/dashboard-ecommerce.js"></script> -->
    <!-- END: Page JS-->

	<!-- CKEDITOR -->
	<!-- <script src="{{url('/')}}/plugins/ckeditor/ckeditor.js"></script> -->
	<!-- <script src="{{url('/')}}/plugins/ckeditor/samples/js/sample.js"></script> -->

    <script>
        // $(window).on('load', function() {
        //     if (feather) {
        //         feather.replace({
        //             width: 14,
        //             height: 14
        //         });
        //     }
        // })
    </script>

    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>

</body>
<!-- END: Body-->

</html>