@extends('frontend.layouts.app')

@section('title')
    {{ appSettingGeneral()['app_name'] }} | {{ appSettingGeneral()['app_title'] }}
@endsection

@section('body')

    <!--
    #################################
        - Begin: SLIDER -
    #################################
    -->
    <div class="owl-carousel owl-theme owl-nav-wide" data-plugin-options="{'items': 1, 'margin': 10, 'nav': true, 'dots': false, 'animateOut': 'fadeOut', 'autoplay': true, 'autoplayTimeout': 6000}">
        <div class="bg-property-slider-1 bg-no-repeat bg-size-cover">
            <div class="property">
                <div class="property-media overlay-wrapper p-top-100 p-bottom-50">
                    <div class="container p-top-100">
                        <div class="badge badge-base text-white m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 text-size-14 m-bottom-20">Featured</div>
                        <div class="badge badge-success p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 text-size-14 m-bottom-20">For Rent</div>
                        <div class="clearfix"></div>
                        <h2 class="text-white text-bold-600 text-size-50 text-size-40-sm m-bottom-10">$250,000 <small class="text-size-18">Per Month</small></h2>
                        <h5><a class="text-white text-bold-500 text-size-30 text-size-25-sm text-white text-white-hover m-bottom-10" href="#">Beautiful Small Apartment</a></h5>
                        <p class="text-white">253 Lake Washington, USA</p>
                    </div>
                    <div class="overlay bg-bg opacity-9"></div>
                </div>
            </div>
        </div>
        <div class="bg-property-slider-2 bg-no-repeat bg-size-cover">
            <div class="property">
                <div class="property-media overlay-wrapper p-top-100 p-bottom-50">
                    <div class="container p-top-100">
                        <div class="badge badge-success p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 text-size-14 m-bottom-20">For Sale</div>
                        <div class="clearfix"></div>
                        <h2 class="text-white text-bold-600 text-size-50 text-size-40-sm m-bottom-10">$120,000</h2>
                        <h5><a class="text-white text-bold-500 text-size-30 text-size-25-sm text-white text-white-hover m-bottom-10" href="#">Beautiful Garaes Condo</a></h5>
                        <p class="text-white">154 Drive, New York</p>
                    </div>
                    <div class="overlay bg-bg opacity-9"></div>
                </div>
            </div>
        </div>
        <div class="bg-property-slider-3 bg-no-repeat bg-size-cover">
            <div class="property">
                <div class="property-media overlay-wrapper p-top-100 p-bottom-50">
                    <div class="container p-top-100">
                        <div class="badge badge-base text-white m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 text-size-14 m-bottom-20">Featured</div>
                        <div class="badge badge-success p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 text-size-14 m-bottom-20">For Rent</div>
                        <div class="clearfix"></div>
                        <h2 class="text-white text-bold-600 text-size-50 text-size-40-sm m-bottom-10">$145,000 <small class="text-size-18">Per Month</small></h2>
                        <h5><a class="text-white text-bold-500 text-size-30 text-size-25-sm text-white text-white-hover m-bottom-10" href="#">Global Land House</a></h5>
                        <p class="text-white">110 Lake, United Kingdom</p>
                    </div>
                    <div class="overlay bg-bg opacity-9"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- End: SLIDER -
    ################################################################## -->

    <div class="bg-white p-top-60 p-bottom-30">
        <div class="container">
            
            <div class="row">
                
                <div class="col-lg-6 col-md-12">
                    <div class="bg-light-3 p-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light m-bottom-30">
                        <h2 class="text-bold-700 m-top-10 m-bottom-30">Popular Countries</h2>

                        <div class="row">
                            <div class="col-lg-6 col-md-6">

                                <ul class="icon-list m-bottom-20">
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">France</a>
                                        <span class="float-right">(10)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">United States</a>
                                        <span class="float-right">(20)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">China</a>
                                        <span class="float-right">(12)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Spain</a>
                                        <span class="float-right">(15)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Poland</a>
                                        <span class="float-right">(25)</span>
                                    </li>
                                </ul>

                            </div>
                            <div class="col-lg-6 col-md-6">

                                <ul class="icon-list m-bottom20">
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Italy</a>
                                        <span class="float-right">(10)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Turkey</a>
                                        <span class="float-right">(20)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">United Kingdom</a>
                                        <span class="float-right">(12)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Germany</a>
                                        <span class="float-right">(15)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Singapore</a>
                                        <span class="float-right">(25)</span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6 col-md-12">
                    <div class="bg-light-3 p-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                        <h2 class="text-bold-700 m-top-10 m-bottom-30">Popular Cities</h2>

                        <div class="row">
                            <div class="col-lg-6 col-md-6">

                                <ul class="icon-list m-bottom-20">
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Bangkok</a>
                                        <span class="float-right">(10)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">London</a>
                                        <span class="float-right">(20)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Paris</a>
                                        <span class="float-right">(12)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Dubai</a>
                                        <span class="float-right">(15)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Rome</a>
                                        <span class="float-right">(25)</span>
                                    </li>
                                </ul>

                            </div>
                            <div class="col-lg-6 col-md-6">

                                <ul class="icon-list m-bottom20">
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">New York</a>
                                        <span class="float-right">(10)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Singapore</a>
                                        <span class="float-right">(20)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Istanbul</a>
                                        <span class="float-right">(12)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Tokyo</a>
                                        <span class="float-right">(15)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Hong Kong</a>
                                        <span class="float-right">(25)</span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <!--
    #################################
        - Begin: PROPERTY -
    #################################
    -->
    <div class="bg-white p-bottom-60">
        <div class="container">

            <h2 class="text-bold-700 m-top-30 m-bottom-40">Newly Added</h2>

            @php
                $params = [
                    'status' => 'active'
                ]
            @endphp

            {!! getProperties($params) !!}

            <!-- <div>

                <ul class="row" data-plugin-masonry>

                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-1.jpg" alt="Property 1">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 12</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$250,000 <small class="text-size-14 text-muted">Per Month</small></h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Beautiful Small Apartment</a></h5>
                                    <p>253 Lake Washington, USA</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 5 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 3 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 36,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-2.jpg" alt="Property 2">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Sale</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 6</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$120,000</h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Beautiful Garaes Condo</a></h5>
                                    <p>154 Drive, New York</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 4 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 2 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 45,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-3.jpg" alt="Property 3">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 14</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$145,000 <small class="text-size-14 text-muted">Per Month</small></h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Global Land House</a></h5>
                                    <p>110 Lake, United Kingdom</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 6 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 3 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 65,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-4.jpg" alt="Property 4">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 8</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$220,000 <small class="text-size-14 text-muted">Per Month</small></h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Our Quality Rent House</a></h5>
                                    <p>221 Madison Seattle, USA</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 7 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 4 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 23,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-5.jpg" alt="Property 5">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Sale</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 16</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$750,000</h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Beautiful House For Sale</a></h5>
                                    <p>200 Lake Drive, USA</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 4 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 3 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 47,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li class="col-lg-4 col-md-6">

                        <div class="property bg-light-2 m-bottom-30 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light">
                            <div class="property-media overlay-wrapper">
                                <img class="full-width" src="{{url('/')}}/frontend/images/property/property-6.jpg" alt="Property 6">
                                <div class="media-data">
                                    <div class="position-top">
                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart"></i></a></div>
                                    </div>
                                    <div class="position-bottom">
                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                        <div class="text-white text-size-18 pull-right"><i class="fa fa-camera"></i> 11</div>
                                    </div>
                                </div>
                                <div class="overlay bg-bg opacity-9"></div>
                            </div>
                            <div class="property-section p-left-15 p-right-15">
                                <div class="m-top-20 m-bottom-20">
                                    <h2 class="text-base text-bold-700 m-top-15">$350,000 <small class="text-size-14 text-muted">Per Month</small></h2>
                                    <h5><a class="text-bold-600 text-dark text-base-hover" href="#">Beautiful Waterfront House</a></h5>
                                    <p>103 Occidental Washington USA</p>
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-bed"></i> 9 Beds</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-tint"></i> 5 Baths</li>
                                        <li class="list-inline-item"><i class="btn btn-base rounded-0 fa fa-expand"></i> 54,000 Sq Ft</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                    </li>

                </ul>

            </div> -->

        </div>
    </div>
    <!-- End: PROPERTY -
    ################################################################## -->

    <!--
    #################################
        - Begin: SERVICES -
    #################################
    -->
    <div class="bg-white p-bottom-30">
        <div class="container">
        
            <div class="row">

                <div class="col-lg-4 col-md-4 m-top-40 m-bottom-40">

                    <div class="service bg-light-2 border-1 border-light box-shadow-1 box-shadow-2-hover">
                        <div class="media">
                            <i class="fa fa-building-o bg-base text-white rounded-100 box-shadow-1 p-top-5 p-bottom-5 p-right-5 p-left-5"></i>
                        </div>
                        <div class="agent-section p-top-35 p-bottom-30 p-right-25 p-left-25">
                            <h4 class="m-bottom-15 text-bold-700">Apartments</h4>
                            <p>Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.</p>
                            <a class="text-base text-base-dark-hover text-size-13" href="#">Read More <i class="fa fa-long-arrow-right"></i></a>
                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-4 m-top-40 m-bottom-40">

                    <div class="service bg-light-2 border-1 border-light box-shadow-1 box-shadow-2-hover">
                        <div class="media">
                            <i class="fa fa-shield bg-base text-white rounded-100 box-shadow-1 p-top-5 p-bottom-5 p-right-5 p-left-5"></i>
                        </div>
                        <div class="agent-section p-top-35 p-bottom-30 p-right-25 p-left-25">
                            <h4 class="m-bottom-15 text-bold-700">Commercial</h4>
                            <p>Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.</p>
                            <a class="text-base text-base-dark-hover text-size-13" href="#">Read More <i class="fa fa-long-arrow-right"></i></a>
                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-4 m-top-40 m-bottom-40">

                    <div class="service bg-light-2 border-1 border-light box-shadow-1 box-shadow-2-hover">
                        <div class="media">
                            <i class="fa fa-bullhorn bg-base text-white rounded-100 box-shadow-1 p-top-5 p-bottom-5 p-right-5 p-left-5"></i>
                        </div>
                        <div class="agent-section p-top-35 p-bottom-30 p-right-25 p-left-25">
                            <h4 class="m-bottom-15 text-bold-700">Houses</h4>
                            <p>Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.</p>
                            <a class="text-base text-base-dark-hover text-size-13" href="#">Read More <i class="fa fa-long-arrow-right"></i></a>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
    <!-- End: SERVICES -
    ################################################################## -->

    <!--
    #################################
        - Begin: AGENTS -
    #################################
    -->
    <div class="container">

        <h2 class="text-bold-700 m-top-30 m-bottom-40">Our Agents</h2>

        <div class="owl-carousel owl-theme m-bottom-60" data-plugin-options="{'items': 4, 'margin': 30, 'loop': false, 'nav': true, 'dots': false}">
            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">

                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-1.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">32 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    MK Builders
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">David Smith</a></h4>
                        <p>253 Lake Washington, USA</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Buying Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> david@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->

            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">
                
                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-2.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">25 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    RealCity
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Alex Brain</a></h4>
                        <p>154 Drive, New York</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Selling Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> alex@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->

            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">
                
                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-3.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">10 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    SK Home
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Fred Kevin</a></h4>
                        <p>110 Lake, United Kingdom</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Buying Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> fred@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->

            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">
                
                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-4.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">7 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    MK Builders
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Angelina Jolie</a></h4>
                        <p>253 Lake Washington, USA</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Buying Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> angelina@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->

            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">
                
                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-5.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">30 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    RealCity
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Twin Smith</a></h4>
                        <p>221 Madison Seattle, USA</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Buying Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> twin@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->

            <!-- AGENT -->
            <div>

                <div class="agent bg-light-2 box-shadow-1 box-shadow-2-hover m-bottom-30 border-1 border-solid border-light">

                    <div class="agent-media overlay-wrapper">
                        <a class="d-block" href="#">
                            <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/agents/agent-6.jpg">
                        </a>
                        <div class="media-data">
                            <div class="position-top">
                                <div class="badge badge-base text-white pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">8 Properties</div>
                            </div>
                            <div class="position-bottom">
                                <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="#">
                                    <i class="fa fa-building-o m-right-4"></i>
                                    SK Home
                                </a>
                            </div>
                        </div>
                        <div class="overlay bg-bg opacity-9"></div>
                    </div>

                    <div class="agent-section p-top-25 p-bottom-25 p-right-15 p-left-15">
                        <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Mark David</a></h4>
                        <p>200 Lake Drive, USA</p>
                        <ul class="icon-list m-bottom-25">
                            <li><i class="btn btn-base rounded-0 fa fa-flag"></i> Buying Agent</li>
                            <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> mark@iproperty.com</li>
                            <li><i class="btn btn-base rounded-0 fa fa-phone"></i> (123) 456-6789</li>
                        </ul>
                        <ul class="social-icons text-center">
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a class="btn btn-base btn-sm rounded-0" href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <!-- /AGENT -->
        </div>

    </div>
    <!-- End: AGENTS -
    ################################################################## -->

    <!--
    #################################
        - Begin: AGENCIES -
    #################################
    -->
    <div class="container">

        <h2 class="text-bold-700 m-bottom-10">Top Agencies</h2>

        <p class="text-size-18 m-bottom-40">Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut</p>

        <div class="row">

            <!-- AGENCY -->
            <div class="col-lg-6 col-md-6">

                <div class="agency bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light p-top-30 p-left-30 p-right-30 m-bottom-30">
                    <div class="row">
                        <div class="col-lg-4 col-md-3 col-sm-4 col-xs-12 p-bottom-15">
                            <div class="agency-media position-relative">
                                <a class="d-block" href="#">
                                    <img class="full-width" alt="Client" src="{{url('/')}}/frontend/images/clients/logo-1.png">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9 col-sm-8 col-xs-12 p-bottom-15">
                            <div class="agency-section position-relative">
                                <div class="agency-data m-top-0 m-bottom-20">
                                    <div class="badge badge-base text-white pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Properties
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">22</span>
                                    </div>
                                    <div class="badge badge-success pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Featured
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">10</span>
                                    </div>
                                    <div class="badge badge-warning pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Agents
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">8</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">MK Builders</a></h4>
                                    <p>253 Lake Washington, USA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /AGENCY -->

            <!-- AGENCY -->
            <div class="col-lg-6 col-md-6">

                <div class="agency bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light p-top-30 p-left-30 p-right-30 m-bottom-30">
                    <div class="row">
                        <div class="col-lg-4 col-md-3 col-sm-4 col-xs-12 p-bottom-15">
                            <div class="agency-media position-relative">
                                <a class="d-block" href="#">
                                    <img class="full-width" alt="Client" src="{{url('/')}}/frontend/images/clients/logo-2.png">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9 col-sm-8 col-xs-12 p-bottom-15">
                            <div class="agency-section position-relative">
                                <div class="agency-data m-top-0 m-bottom-20">
                                    <div class="badge badge-base text-white pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Properties
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">22</span>
                                    </div>
                                    <div class="badge badge-success pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Featured
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">10</span>
                                    </div>
                                    <div class="badge badge-warning pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Agents
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">8</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">Real Estate</a></h4>
                                    <p>154 Drive, New York</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /AGENCY -->

            <!-- AGENCY -->
            <div class="col-lg-6 col-md-6">

                <div class="agency bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light p-top-30 p-left-30 p-right-30 m-bottom-30">
                    <div class="row">
                        <div class="col-lg-4 col-md-3 col-sm-4 col-xs-12 p-bottom-15">
                            <div class="agency-media position-relative">
                                <a class="d-block" href="#">
                                    <img class="full-width" alt="Client" src="{{url('/')}}/frontend/images/clients/logo-3.png">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9 col-sm-8 col-xs-12 p-bottom-15">
                            <div class="agency-section position-relative">
                                <div class="agency-data m-top-0 m-bottom-20">
                                    <div class="badge badge-base text-white pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Properties
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">22</span>
                                    </div>
                                    <div class="badge badge-success pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Featured
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">10</span>
                                    </div>
                                    <div class="badge badge-warning pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Agents
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">8</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">The Big City</a></h4>
                                    <p>110 Lake, United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /AGENCY -->

            <!-- AGENCY -->
            <div class="col-lg-6 col-md-6">

                <div class="agency bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light p-top-30 p-left-30 p-right-30 m-bottom-30">
                    <div class="row">
                        <div class="col-lg-4 col-md-3 col-sm-4 col-xs-12 p-bottom-15">
                            <div class="agency-media position-relative">
                                <a class="d-block" href="#">
                                    <img class="full-width" alt="Client" src="{{url('/')}}/frontend/images/clients/logo-4.png">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9 col-sm-8 col-xs-12 p-bottom-15">
                            <div class="agency-section position-relative">
                                <div class="agency-data m-top-0 m-bottom-20">
                                    <div class="badge badge-base text-white pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Properties
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">22</span>
                                    </div>
                                    <div class="badge badge-success pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Featured
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">10</span>
                                    </div>
                                    <div class="badge badge-warning pull-left m-right-20 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0 m-bottom-20">
                                        Agents
                                        <span class="badge badge-white box-shadow-3 text-dark border-1 border-light">8</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4 class="text-bold-700"><a class="text-dark text-base-hover" href="#">SK Home</a></h4>
                                    <p>103 Occidental Washington USA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /AGENCY -->

        </div>

    </div>
    <!-- End: AGENCIES -
    ################################################################## -->

    <!--
    #################################
        - Begin: NEWS -
    #################################
    -->
    <div class="bg-white p-top-60 p-bottom-30">
        <div class="container">

            <h2 class="text-bold-700 m-bottom-10">Most Recent News</h2>

            <p class="text-size-18 m-bottom-40">Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut</p>

            <div class="row">

                <!-- BLOG -->
                <div class="col-lg-4 col-md-6">
                    
                    <div class="blog bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light m-bottom-30">
                        
                        <div class="blog-media overlay-wrapper">

                            <a href="#">
                                <img class="full-width" src="{{url('/')}}/frontend/images/blog/blog-1.jpg" alt="...">
                            </a>

                            <div class="media-data">
                                <div class="position-top">
                                    <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">
                                        <i class="m-right-4 fa fa-calendar"></i>
                                        13, Jan 2017
                                    </div>
                                </div>
                                <div class="position-bottom">
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-user"></i>
                                            <a class="text-white text-white-hover" href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-tags"></i>
                                            <a class="text-white text-white-hover" href="#">News</a>,
                                            <a class="text-white text-white-hover" href="#">Property</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-comments"></i>
                                            <a class="text-white text-white-hover" href="#">24</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="overlay bg-bg opacity-7"></div>

                        </div>

                        <div class="p-top-25 p-bottom-30 p-left-15 p-right-15">

                            <h4 class="m-bottom-20">
                                <a class="text-bold-600 line-height-32 text-dark text-base-hover" href="#">Integer dignissim enim nec molestie pharetra</a>
                            </h4>

                            <a class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-left-15 p-right-15" href="#">
                                Read More
                                <i class="m-left-4 fa fa-long-arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>
                <!-- /BLOG -->

                <!-- BLOG -->
                <div class="col-lg-4 col-md-6">
                    
                    <div class="blog bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light m-bottom-30">
                        
                        <div class="blog-media overlay-wrapper">

                            <a href="#">
                                <img class="full-width" src="{{url('/')}}/frontend/images/blog/blog-2.jpg" alt="...">
                            </a>

                            <div class="media-data">
                                <div class="position-top">
                                    <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">
                                        <i class="m-right-4 fa fa-calendar"></i>
                                        13, Jan 2017
                                    </div>
                                </div>
                                <div class="position-bottom">
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-user"></i>
                                            <a class="text-white text-white-hover" href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-tags"></i>
                                            <a class="text-white text-white-hover" href="#">News</a>,
                                            <a class="text-white text-white-hover" href="#">Property</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-comments"></i>
                                            <a class="text-white text-white-hover" href="#">24</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="overlay bg-bg opacity-7"></div>

                        </div>

                        <div class="p-top-25 p-bottom-30 p-left-15 p-right-15">

                            <h4 class="m-bottom-20">
                                <a class="text-bold-600 line-height-32 text-dark text-base-hover" href="#">Integer dignissim enim nec molestie pharetra</a>
                            </h4>

                            <a class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-left-15 p-right-15" href="#">
                                Read More
                                <i class="m-left-4 fa fa-long-arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>
                <!-- /BLOG -->

                <!-- BLOG -->
                <div class="col-lg-4 col-md-6">
                    
                    <div class="blog bg-light-2 box-shadow-1 box-shadow-2-hover border-1 border-solid border-light m-bottom-30">
                        
                        <div class="blog-media overlay-wrapper">

                            <a href="#">
                                <img class="full-width" src="{{url('/')}}/frontend/images/blog/blog-3.jpg" alt="...">
                            </a>

                            <div class="media-data">
                                <div class="position-top">
                                    <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">
                                        <i class="m-right-4 fa fa-calendar"></i>
                                        13, Jan 2017
                                    </div>
                                </div>
                                <div class="position-bottom">
                                    <ul class="icon-list list-inline m-bottom-0">
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-user"></i>
                                            <a class="text-white text-white-hover" href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-tags"></i>
                                            <a class="text-white text-white-hover" href="#">News</a>,
                                            <a class="text-white text-white-hover" href="#">Property</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="btn btn-base fa fa-comments"></i>
                                            <a class="text-white text-white-hover" href="#">24</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="overlay bg-bg opacity-7"></div>

                        </div>

                        <div class="p-top-25 p-bottom-30 p-left-15 p-right-15">

                            <h4 class="m-bottom-20">
                                <a class="text-bold-600 line-height-32 text-dark text-base-hover" href="#">Integer dignissim enim nec molestie pharetra</a>
                            </h4>

                            <a class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-left-15 p-right-15" href="#">
                                Read More
                                <i class="m-left-4 fa fa-long-arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>
                <!-- /BLOG -->

            </div>

        </div>
    </div>
    <!-- End: NEWS -
    ################################################################## -->

    <!--
    #################################
        - Begin: CLIENTS -
    #################################
    -->
    <div class="bg-white p-top-60 p-bottom-60">
        <div class="container">

            <h2 class="text-bold-700 m-bottom-10 text-center">Clients We’ve Worked With</h2>

            <p class="text-size-18 text-center m-bottom-40">Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut</p>

            <div class="owl-carousel owl-theme owl-nav-left" data-plugin-options="{'responsive': {'0': {'items': 2}, '479': {'items': 3}, '768': {'items': 4}, '979': {'items': 5}, '1199': {'items': 6}}, 'margin': 30, 'loop': false, 'nav': false, 'dots': true}">
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-1.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-2.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-3.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-4.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-5.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-6.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-7.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-8.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-9.png">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img alt="client" src="{{url('/')}}/frontend/images/clients/logo-10.png">
                    </a>
                </div>
            </div>

        </div>
    </div>
    <!-- End: CLIENTS -
    ################################################################## -->

@endsection