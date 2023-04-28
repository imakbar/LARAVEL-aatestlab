<!--
#################################
    - Begin: HEADER -
#################################
-->
<header class="main-header bg-light-2 box-shadow-1">

    <!-- TOGGLE -->
    <a href="#" class="nav-link nav-menu-main menu-toggle btn btn-base rounded-0">
        <i class="fa fa-bars"></i>
    </a>
    <!-- /TOGGLE -->

    <!-- TOPBAR -->
    <div class="inner-header d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-2">
                    <!-- LOGO -->
                    <a class="navbar-brand logo" href="{{url('/')}}">
                        <img class="full-width max-width-130-sm max-width-130-md" alt="{{appSettingGeneral()['app_name']}}" src="{{appSettingLogos()['logo_light']->path}}">
                    </a>
                    <!-- /LOGO -->
                </div>
                <div class="col-lg-10 col-md-9 col-sm-8 text-right">
                    <div class="extra-info">
                        <ul>
                            <li class="m-top-5 hidden-xs hidden-sm hidden-md">
                                <i class="fa fa-phone text-base text-size-30"></i>
                                <div class="text">
                                    <div class="text-top text-weight-400 text-muted text-size-13">
                                        CALL US
                                    </div>
                                    <div class="text-bottom text-bold-700 text-black">
                                        {{appSettingGeneral()['app_phone']}}
                                    </div>
                                </div>
                            </li>
                            <li class="m-top-5 hidden-xs hidden-sm hidden-md">
                                <i class="fa fa-envelope-o text-base text-size-30"></i>
                                <div class="text">
                                    <div class="text-top text-bold-400 text-muted text-size-13">
                                        EMAIL US
                                    </div>
                                    <div class="text-bottom text-bold-700 text-black">
                                        {{appSettingGeneral()['app_email']}}
                                    </div>
                                </div>
                            </li>
                            <li class="m-top-5 hidden-xs hidden-sm hidden-md">
                                <i class="fa fa-clock-o text-base text-size-30"></i>
                                <div class="text">
                                    <div class="text-top text-bold-400 text-muted text-size-13">
                                        WE'ARE OPEN
                                    </div>
                                    <div class="text-bottom text-bold-700 text-black">
                                        {{appSettingGeneral()['app_office_timing']}}
                                    </div>
                                </div>
                            </li>
                            <li class="hidden-xs hidden-sm">
                                <a href="submit-property.html" class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-top-12 p-bottom-12 p-left-15 p-right-15 text-size-11-lg">Submit Property</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /TOPBAR -->

    <!-- NAVIGATION -->
    <div role="navigation" data-menu="menu-wrapper" class="header-navbar navbar bg-base-dark navbar-fixed box-shadow-3">
        
        <!-- MENU CONTENT -->
        <div data-menu="menu-container" class="container navbar-container main-menu-content">

            <ul id="main-menu-navigation" data-menu="menu-navigation" class="nav navbar-nav">
                <li data-menu="dropdown" class="dropdown nav-item active">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-home"></i> <span>Home</span></a>
                    <ul class="dropdown-menu">
                        <li class="active">
                            <a href="index.html" data-toggle="dropdown" class="dropdown-item">Home 1</a>
                        </li>
                        <li>
                            <a href="index-2.html" data-toggle="dropdown" class="dropdown-item">Home 2</a>
                        </li>
                        <li>
                            <a href="index-3.html" data-toggle="dropdown" class="dropdown-item">Home 3</a>
                        </li>
                    </ul>
                </li>
                <li data-menu="dropdown" class="dropdown nav-item">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-building-o"></i><span>Properties</span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="property-designs.html" class="dropdown-item">Property - Designs</a>
                        </li>
                        <li>
                            <a href="property-grid.html" class="dropdown-item">Property - Grid</a>
                        </li>
                        <li>
                            <a href="property-fullwidth.html" class="dropdown-item">Property - Fullwidth</a>
                        </li>
                        <li>
                            <a href="property-sidebar.html" class="dropdown-item">Property - Sidebar</a>
                        </li>
                        <li>
                            <a href="single-property.html" class="dropdown-item">Single Property</a>
                        </li>
                    </ul>
                </li>
                <li data-menu="dropdown" class="dropdown nav-item">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-users"></i> <span>Agents</span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="agents-grid.html" data-toggle="dropdown" class="dropdown-item">Agents - Grid</a>
                        </li>
                        <li>
                            <a href="agents-fullwidth.html" data-toggle="dropdown" class="dropdown-item">Agents - Fullwidth</a>
                        </li>
                        <li>
                            <a href="single-agent.html" data-toggle="dropdown" class="dropdown-item">Single Agent</a>
                        </li>
                    </ul>
                </li>
                <li data-menu="dropdown" class="dropdown nav-item">
                    <a href="agencies.html" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-id-badge"></i> <span>Agencies</span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="agencies.html" data-toggle="dropdown" class="dropdown-item">Agencies - 1</a>
                        </li>
                        <li>
                            <a href="agencies-2.html" data-toggle="dropdown" class="dropdown-item">Agencies - 2</a>
                        </li>
                        <li>
                            <a href="single-agency.html" data-toggle="dropdown" class="dropdown-item">Single Agency</a>
                        </li>
                    </ul>
                </li>
                <li data-menu="dropdown" class="dropdown nav-item">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-commenting-o"></i> <span>Blog</span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="blog-grid.html" data-toggle="dropdown" class="dropdown-item">Blog - Grid</a>
                        </li>
                        <li>
                            <a href="blog-fullwidth.html" data-toggle="dropdown" class="dropdown-item">Blog - Fullwidth</a>
                        </li>
                        <li>
                            <a href="single-blog.html" data-toggle="dropdown" class="dropdown-item">Single Blog</a>
                        </li>
                    </ul>
                </li>
                <li data-menu="dropdown" class="dropdown nav-item">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link"><i class="fa fa-star-o"></i><span>Pages</span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="about-us.html" class="dropdown-item">About Us</a>
                        </li>
                        <li>
                            <a href="contact-us.html" class="dropdown-item">Contact Us</a>
                        </li>
                        <li>
                            <a href="404.html" class="dropdown-item">404</a>
                        </li>
                        <li data-menu="dropdown-submenu" class="dropdown dropdown-submenu">
                            <a href="#" data-toggle="dropdown" class="dropdown-item dropdown-toggle">My Account</a>
                            <ul class="dropdown-menu">
                                <li data-menu="">
                                    <a href="my-profile.html" data-toggle="dropdown" class="dropdown-item">My Profile</a>
                                </li>
                                <li data-menu="">
                                    <a href="submit-property.html" data-toggle="dropdown" class="dropdown-item">Submit Property</a>
                                </li>
                                <li data-menu="">
                                    <a href="my-properties.html" data-toggle="dropdown" class="dropdown-item">My Properties</a>
                                </li>
                                <li data-menu="">
                                    <a href="my-bookmarked.html" data-toggle="dropdown" class="dropdown-item">My Bookmarked</a>
                                </li>
                                <li data-menu="">
                                    <a href="change-password.html" data-toggle="dropdown" class="dropdown-item">Change Password</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="login.html" class="dropdown-item">Login</a>
                        </li>
                        <li>
                            <a href="register.html" class="dropdown-item">Register</a>
                        </li>
                        <li>
                            <a href="lost-password.html" class="dropdown-item">Lost Password</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="shortcodes.html" class="nav-link"><i class="fa fa-cogs"></i> <span>Shortcodes</span></a>
                </li>
            </ul>

        </div>
        <!-- /MENU CONTENT -->

    </div>
    <!-- /NAVIGATION -->

</header>
<!-- End: HEADER -
################################################################## -->