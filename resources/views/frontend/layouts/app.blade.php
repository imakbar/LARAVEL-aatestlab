<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>@yield('title')</title>

    <link rel="icon" href="{{url('/')}}/frontend/images/favicon.png" type="image/png">

    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/css/main.css">
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/css/utility.css">
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/css/responsive.css">

    <!-- THEME COLOR -->
    <link href="{{url('/')}}/frontend/css/colors/blue.css" type="text/css" media="all" rel="stylesheet" id="colors" />

    <!-- MAIN MENU -->
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/menu/css/bootstrap-extended.css">

    <!-- OWL CAROUSEL SLIDER -->
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/owl.carousel/css/owl.carousel.min.css">

    <!-- SLICK SLIDER -->
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/slick/slick.css">
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/slick/slick-theme.css">

    <!-- FANCY BOX -->
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/fancybox/jquery.fancybox.min.css">

    <!-- FILE-UPLOADER -->
    <link rel="stylesheet" href="{{url('/')}}/frontend/vendors/fileuploader/css/jquery.fileuploader.css" media="all">
    <link rel="stylesheet" href="{{url('/')}}/frontend/vendors/fileuploader/css/jquery.fileuploader-theme-thumbnails.css" media="all">

    <!-- Begin: HTML5SHIV FOR IE8 -->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="{{url('/')}}/frontend/vendors/js/html5shiv.js"></script>
      <script src="{{url('/')}}/frontend/vendors/js/respond.js"></script>
    <![endif]-->
    <!-- end: HTML5SHIV FOR IE8 -->
</head>

<body data-menu="header-main-menu" class="bg-white body-main-menu header-main-menu">

    @include('frontend.includes.header')

    @yield('body')

    @include('frontend.includes.footer')

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="{{url('/')}}/frontend/js/jquery.min.js"></script>
    <script src="{{url('/')}}/frontend/js/popper.min.js"></script>
    <script src="{{url('/')}}/frontend/vendors/appear/jquery.appear.min.js"></script>
    <script src="{{url('/')}}/frontend/vendors/jquery.easing/jquery.easing.min.js"></script>
    <script src="{{url('/')}}/frontend/js/tether.min.js"></script>
    <script src="{{url('/')}}/frontend/js/bootstrap.min.js"></script>
    <script src="{{url('/')}}/frontend/vendors/common/common.min.js"></script>

    <!-- MAIN MENU -->
    <script src="{{url('/')}}/frontend/vendors/menu/js/vendors-menu.min.js"></script>
    <script src="{{url('/')}}/frontend/vendors/menu/js/jquery.sticky.js"></script>
    <script src="{{url('/')}}/frontend/vendors/menu/js/app-menu.js"></script>

    <!-- MAP -->
    <script src="{{url('/')}}/frontend/vendors/gmap/jquery.axgmap.js"></script>

    <!-- MASONRY -->
    <script src="{{url('/')}}/frontend/vendors/isotope/jquery.isotope.min.js"></script>

    <!-- OWL CAROUSEL SLIDER -->
    <script src="{{url('/')}}/frontend/vendors/owl.carousel/js/owl.carousel.min.js"></script>

    <!-- SILCK SLIDER -->
    <script src="{{url('/')}}/frontend/vendors/slick/slick.js"></script>

    <!-- FANCY BOX -->
    <script src="{{url('/')}}/frontend/vendors/fancybox/jquery.fancybox.min.js"></script>

    <!-- FILE-UPLOADER -->
    <script src="{{url('/')}}/frontend/vendors/fileuploader/js/jquery.fileuploader.min.js"></script>
    <script src="{{url('/')}}/frontend/vendors/fileuploader/js/custom.js"></script>

    <!-- THEME-CUSTOM -->
    <script src="{{url('/')}}/frontend/js/main.js"></script>
    
    <!-- THEME-INITIALIZATION-FILES -->
    <script src="{{url('/')}}/frontend/js/theme.init.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhpYHdYRY2U6V_VfyyNtkPHhywLjDkhfg"></script>
    <script>
        // Markers
        $("#googlemapsMarkers").gMap({
            controls: {
                draggable: (($.browser.mobile) ? false : true),
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true
            },
            scrollwheel: false,
            markers: [{
                address: "217 Summit Boulevard, Birmingham, AL 35243",
                html: "<strong>Alabama Office</strong><br>217 Summit Boulevard, Birmingham, AL 35243",
                icon: {
                    image: "assets/images/map/pin.png",
                    iconsize: [54, 55],
                    iconanchor: [12, 46]
                }
            },{
                address: "645 E. Shaw Avenue, Fresno, CA 93710",
                html: "<strong>California Office</strong><br>645 E. Shaw Avenue, Fresno, CA 93710",
                icon: {
                    image: "assets/images/map/pin.png",
                    iconsize: [54, 55],
                    iconanchor: [12, 46]
                }
            },{
                address: "New York, NY 10017",
                html: "<strong>New York Office</strong><br>New York, NY 10017",
                icon: {
                    image: "assets/images/map/pin.png",
                    iconsize: [54, 55],
                    iconanchor: [12, 46]
                }
            }],
            latitude: 37.09024,
            longitude: -95.71289,
            zoom: 3
        });
    </script>

    <!-- SWITCHER | BEGIN -->
    <div class='style-switcher' id='style-switcher'>
        <div class='style-switcher-heading'>
            <!-- SWITCHER COLORS -->
            <div class='custom_icon'>
                <i class='fa fa-cog c_rotating text-base'></i>
            </div>
        </div>
        <div class='style-switcher-body'>
            <div class='style-switcher-colors'>
                <div class='style-switcher-title'>Color Scheme</div>
                <a class='style-switcher-color limegreen' data-switch-target='#colors' data-switch-to='limegreen.css' href='#' title="LimeGreen"></a>
                <a class='style-switcher-color golden' data-switch-target='#colors' data-switch-to='golden.css' href='#' title="Golden"></a>
                <a class='style-switcher-color autumn' data-switch-target='#colors' data-switch-to='autumn.css' href='#' title="Autumn"></a>
                <a class='style-switcher-color blue active' data-switch-default data-switch-target='#colors' data-switch-to='blue.css' href='#' title="Blue"></a>
                <a class='style-switcher-color skyblue' data-switch-target='#colors' data-switch-to='skyblue.css' href='#' title="Skyblue"></a>
                <a class='style-switcher-color cherry' data-switch-target='#colors' data-switch-to='cherry.css' href='#' title="Cherry"></a>
                <a class='style-switcher-color orange' data-switch-target='#colors' data-switch-to='orange.css' href='#' title="Orange"></a>
                <a class='style-switcher-color pink' data-switch-target='#colors' data-switch-to='pink.css' href='#' title="Pink"></a>
                <a class='style-switcher-color purple' data-switch-target='#colors' data-switch-to='purple.css' href='#' title="Purple"></a>
                <a class='style-switcher-color alphagreen' data-switch-target='#colors' data-switch-to='alphagreen.css' href='#' title="AlphaGreen"></a>
            </div>
            <div class='style-switcher-reset'>
                <a class='style-switcher-button btn-base' data-switch-target='#style-switcher' data-switch-to='reset:defaults' href='#' title="">Reset to defaults</a>
            </div>
        </div>
    </div>

    <link rel="stylesheet" type="text/css" href="{{url('/')}}/frontend/vendors/switcher/css/demo.css" media="all" />
    <script src="{{url('/')}}/frontend/vendors/switcher/js/demo.js" ></script>
    <script src="{{url('/')}}/frontend/vendors/switcher/js/jquery.cookie.js"></script>
    <!-- SWITCHER | END -->

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-70250779-1', 'auto');
      ga('send', 'pageview');

    </script>
    
</body>
</html>