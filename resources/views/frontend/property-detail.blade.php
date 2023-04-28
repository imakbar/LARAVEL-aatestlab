@extends('frontend.layouts.app')

@section('title')
    {{ appSettingGeneral()['app_name'] }} | {{ appSettingGeneral()['app_title'] }}
@endsection

@section('body')

    <!--
    #################################
        - Begin: PROPERTY -
    #################################
    -->
    <div class="bg-white box-shadow-1 z-index-10 position-relative p-top-60 p-bottom-30">
        <div class="container">

            <div class="row">
                <div class="col-md-8">
                    <div class="clearfix">
                        <div class="badge badge-base text-white pull-left m-right-8 m-bottom-15 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                        <div class="badge badge-success pull-left m-bottom-15 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">{{propertyPurpose($slug)}}</div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <div class="m-bottom-30 clearfix">
                        <h2>{{propertyTitle($slug)}}</h2>
                        <p>{{propertyAddress($slug)}}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="m-bottom-30 text-right">
                        <h1 class="text-bold-700 text-base">${{propertyPrice($slug)}}</h1>
                        <p class="">{{propertyTimeperiod($slug)}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="bg-light-3 p-top-60 p-bottom-60">
        <div class="container">

            <div class="row">

                <!-- CONTENT -->
                <div class="col-lg-8 col-md-12">

                    <!-- SLIDER -->
                    <div class="row m-bottom-30">
                        <div class="col-md-12">
                            <div class="thumbnail-slider">
                                <div class="slick-thumbnail">
                                    @foreach(propertyGallery($slug,'property') as $item)
                                    <div>
                                        <a data-fancybox="slider" href="{{url('/')}}{{$item['path']}}">
                                            <img alt="..." class="full-width" src="{{url('/')}}{{$item['path']}}">
                                        </a>
                                    </div>
                                    @endforeach
                                </div>
                                <div class="slick-thumbnail-nav thumbnails">
                                    @foreach(propertyGallery($slug,'thumbnail') as $item)
                                    <div>
                                        <img alt="..." class="full-width" src="{{url('/')}}{{$item['path']}}">
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /SLIDER -->
                    
                    <!-- DESCTIPTION -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">DESCRIPTION</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>
                                {{propertyDescription($slug)}}
                            </div>
                        </div>
                    </div>
                    <!-- /DESCTIPTION -->
                    
                    <!-- ADDRESS -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">ADDRESS</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <div class="row m-bottom-30">
                                    <div class="col-md-12">
                                        @if(propertyAddress($slug))
                                        <div class="row m-bottom-10">
                                            <div class="col-6"><strong>Address:</strong></div>
                                            <div class="col-6 text-right">{{propertyAddress($slug)}}</div>
                                        </div>
                                        @endif
                                        @if(propertyState($slug))
                                        <div class="row m-bottom-10">
                                            <div class="col-6"><strong>State:</strong></div>
                                            <div class="col-6 text-right">{{propertyState($slug)}}</div>
                                        </div>
                                        @endif
                                        @if(propertyCountry($slug))
                                        <div class="row m-bottom-10">
                                            <div class="col-6"><strong>Country:</strong></div>
                                            <div class="col-6 text-right">{{propertyCountry($slug)}}</div>
                                        </div>
                                        @endif
                                        @if(propertyCity($slug))
                                        <div class="row m-bottom-10">
                                            <div class="col-6"><strong>City:</strong></div>
                                            <div class="col-6 text-right">{{propertyCity($slug)}}</div>
                                        </div>
                                        @endif
                                        @if(propertyNeighborhood($slug))
                                        <div class="row m-bottom-10">
                                            <div class="col-6"><strong>Neighborhood:</strong></div>
                                            <div class="col-6 text-right">{{propertyNeighborhood($slug)}}</div>
                                        </div>
                                        @endif
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="googlemapsMarkers" class="google-map mt-none mb-lg height-280"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /ADDRESS -->
                    
                    <!-- DETAIL -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">DETAILS</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <div class="row">
                                    @if(propertyType($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Type:</strong></div>
                                            <div class="col-7 text-right">{{propertyType($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    @if(propertyPurpose($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Purpose:</strong></div>
                                            <div class="col-7 text-right">{{propertyPurpose($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    @if(propertyStatus($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Purpose:</strong></div>
                                            <div class="col-7 text-right">{{propertyStatus($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    @if(propertyBedrooms($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Bedrooms:</strong></div>
                                            <div class="col-7 text-right">{{propertyBedrooms($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    @if(propertyBeds($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Beds:</strong></div>
                                            <div class="col-7 text-right">{{propertyBeds($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    @if(propertyBathrooms($slug))
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Bathrooms:</strong></div>
                                            <div class="col-7 text-right">{{propertyBathrooms($slug)}}</div>
                                        </div>
                                    </div>
                                    @endif
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Phone:</strong></div>
                                            <div class="col-7 text-right">{{propertyPhone($slug)}}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Mobile:</strong></div>
                                            <div class="col-7 text-right">{{propertyMobile($slug)}}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Home Area:</strong></div>
                                            <div class="col-7 text-right">{{propertyHomearea($slug)}}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Lot Area:</strong></div>
                                            <div class="col-7 text-right">{{propertyLotarea($slug)}}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row m-bottom-10">
                                            <div class="col-5"><strong>Year Built:</strong></div>
                                            <div class="col-7 text-right">{{propertyYearbuilt($slug)}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /DETAIL -->
                    
                    <!-- AMENITIES -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">AMENITIES</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <ul class="icon-list list-col-3 clearfix">
                                    @foreach(propertyAmenities($slug) as $item)
                                    <li>
                                        @if($item->active)
                                            <i class="btn btn-base rounded-0 fa fa-check"></i>
                                        @else
                                            <i class="btn btn-secondary rounded-0 fa fa-close"></i>
                                        @endif
                                        {{$item->name}}
                                    </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /AMENITIES -->
                    
                    <!-- FACILITIES -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">FACILITIES</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>
                    
                                <div class="row">
                                    @foreach(propertyFacilities($slug) as $item)
                                        @if($item['active'])
                                            <div class="col-md-6">
                                                <div class="row m-bottom-10">
                                                    <div class="col-8"><strong>{{$item['name']}}:</strong></div>
                                                    <div class="col-4 text-right">{{$item['distance']}} {{$item['facilitydistance_id']['name']}}</div>
                                                </div>
                                            </div>
                                        @endif
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /FACILITIES -->
                    
                    <!-- VALUATION -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">VALUATION</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>
                    
                                <div class="row">
                                    
                                    @foreach(propertyValuations($slug) as $item)
                                        @if($item['active'])
                                            <div class="col-md-12 m-bottom-15">
                                                <div class="progress-label">
                                                    <div class="text-bold-600 m-bottom-5">
                                                        <span>{{$item['name']}}</span>
                                                        <span>({{$item['value']}}%)</span>
                                                    </div>
                                                </div>
                                                <div class="progress bg-light rounded-0">
                                                    <div class="progress-bar bg-base rounded-0" data-appear-progress-animation="{{$item['value']}}%" data-appear-animation-delay="300">
                                                        <span class="progress-bar-tooltip">{{$item['value']}}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    @endforeach

                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- /VALUATION -->
                    
                    <!-- FLOOR PLANS -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">FLOOR PLANS</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 m-bottom-10 active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">First Floor</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 m-bottom-10" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Senond Floor</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                        <p>Nulla nec tempor pharetra, diam turpis sollicitudin ex, quis tristique orci justo et nisl. Nullam efficitur ex vel mi malesuada, sit amet maximus felis laoreet. Sed urna mauris, eleifend nec felis auctor, rhoncus dictum tellus. Integer lacinia ut justo id finibus. Proin mattis, urna in pulvinar condimentum.</p>
                                        <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/floors/floor-1.jpg">
                                    </div>
                                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                        <p>Nullam efficitur ex vel mi malesuada, sit amet maximus felis laoreet. Sed urna mauris, eleifend nec felis auctor, rhoncus dictum tellus. Integer Nulla nec tempor pharetra diam turpis sollicitudin ex, quis tristique orci justo et nisl. lacinia ut justo id finibus. Proin mattis, urna in pulvinar condimentum.</p>
                                        <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/floors/floor-2.jpg">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- /FLOOR PLANS -->
                    
                    <!-- AGENT -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-50">
                            <div class="bg-white card-body p-top-30 p-bottom-30 p-left-30 p-right-30 box-shadow-1">
                                <h3 class="text-bold-700 m-bottom-10">AGENT</h3>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>
                    
                                <div class="row">
                                    <div class="agent col-md-4 col-sm-12 match-height vcenter">
                                        <div class="agent-media position-relative">
                                            <a class="d-block" href="#">
                                                <img class="full-width" alt="Agent" src="{{url('/')}}/frontend/images/agents/agent-1.jpg">
                                            </a>
                                            <div class="media-data">
                                                <div class="position-top">
                                                    <a class="btn btn-base text-bold-600 text-spacing-5 text-size-11 pull-left line-height-11 rounded-0 p-top-8 p-right-12 p-bottom-8 p-left-12" href="{{propertyAgentUrl($slug)}}">{{moreThan(propertyAgentPropertiesCount($slug),1,'Property','Properties')}}</a>
                                                </div>
                                                <div class="position-bottom">
                                                    <a class="btn btn-white text-bold-600 text-spacing-5 text-size-13 pull-left line-height-18 rounded-0" href="{{propertyAgencyUrl($slug)}}">
                                                        <i class="fa fa-building-o m-right-4"></i>
                                                        {{propertyAgencyName($slug)}}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-sm-12 match-height vcenter">
                                        <div class="agent-section position-relative p-top-10 p-right-15 p-left-15 p-top-30-sm p-bottom-25-sm">
                                            <div class="agent-data m-top-0 m-bottom-20">
                                                <h4 class="text-uppercase text-bold-700"><a href="#" class="text-base">{{propertyAgentFirstName($slug)}} {{propertyAgentLastName($slug)}}</a></h4>
                                                <p class="designation">{{propertyAgentAddress($slug)}}</p>
                                            </div>
                                            <ul class="icon-list">
                                                <li><i class="btn btn-base rounded-0 fa fa-flag"></i> {{propertyAgentProfileType($slug)}}</li>
                                                <li><i class="btn btn-base rounded-0 fa fa-envelope"></i> {{propertyAgentEmail($slug)}}</li>
                                                <li><i class="btn btn-base rounded-0 fa fa-phone"></i> {{propertyAgentMobileNumber($slug)}}</li>
                                            </ul>
                                            <div class="p-top-10 p-right-15 p-bottom-10">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <a class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 m-bottom-10 p-left-15 p-right-15 m-right-4" href="{{propertyAgentUrl($slug)}}">Agent Detail</a>
                                                        <a class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 m-bottom-10 p-left-15 p-right-15 m-right-4" href="#">Contact Agent</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /AGENT -->
                    
                    <!-- SIMILAR PROPERTIES -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <h3 class="text-bold-700 m-bottom-10">SIMILAR PROPERTIES</h3>
                    
                            <div class="hr dark text-left m-bottom-20">
                                <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                <div class="icons text-light">
                                    <i class="fa fa-circle-o"></i>
                                    <i class="fa fa-circle-o"></i>
                                    <i class="fa fa-circle-o"></i>
                                </div>
                                <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                            </div>

                            @php
                                $params = [
                                    'classes' => 'col-lg-6 col-md-6',
                                    'status' => 'active',
                                    'propertytype_id' => $slug,
                                    'propertypurpose_id' => $slug,
                                    'order' => 'DESC',
                                    'limit' => 2,
                                ]
                            @endphp

                            {!! getProperties($params) !!}
                            
                        </div>
                    </div>
                    <!-- /SIMILAR PROPERTIES -->

                </div>
                <!-- /CONTENT -->

                <!-- SIDEBAR -->
                <div class="col-lg-4 col-md-12">

                    <!-- SEARCH -->
                    <div class="bg-white card-body p-20 box-shadow-1 m-bottom-30">
                
                        <div class="row">

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="text-bold-700 text-uppercase text-size-13">- Property Type -</label>
                                    <select name="property_type_id" class="form-control rounded-0 bg-light-5">
                                        <option>-- Property Type --</option>
                                        <option value="1">House</option>
                                        <option value="2">Plots</option>
                                        <option value="3">Commercial</option>
                                        <option value="4">Appartments</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="text-bold-700 text-uppercase text-size-13">- Property Purpose -</label>
                                    <select name="property_purpose_id" class="form-control rounded-0 bg-light-5">
                                        <option>-- Property Purpose --</option>
                                        <option value="1">For Rent</option>
                                        <option value="2">For Sale</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="text-bold-700 text-uppercase text-size-13">- Price -</label>
                                    <div class="row">
                                        <div class="col-6">
                                            <input type="text" name="price_from" class="form-control rounded-0 bg-light-5" placeholder="Price from">
                                        </div>
                                        <div class="col-6">
                                            <input type="text" name="price_to" class="form-control rounded-0 bg-light-5" placeholder="Price to">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="text-bold-700 text-uppercase text-size-13">- Bedrooms -</label>
                                    <div class="row">
                                        <div class="col-6">
                                            <select name="bedroom_from_id" class="form-control rounded-0 bg-light-5">
                                                <option>-- From --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <select name="bedroom_to_id" class="form-control rounded-0 bg-light-5">
                                                <option>-- To --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="text-bold-700 text-uppercase text-size-13">- Bathrooms -</label>
                                    <div class="row">
                                        <div class="col-6">
                                            <select name="bathroom_from_id" class="form-control rounded-0 bg-light-5">
                                                <option>-- From --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <select name="bathroom_to_id" class="form-control rounded-0 bg-light-5">
                                                <option>-- To --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="collapse" id="advanced_search">

                            <div class="row">

                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label class="text-bold-700 text-uppercase text-size-13">- Keyword -</label>
                                        <input type="text" name="keyword" class="form-control rounded-0 bg-light-5" placeholder="Enter Keyword Here">
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label class="text-bold-700 text-uppercase text-size-13">- Country -</label>
                                        <select name="country_id" class="form-control rounded-0 bg-light-5">
                                            <option>-- Country --</option>
                                            <option value="1">Pakistan</option>
                                            <option value="2">USA</option>
                                            <option value="3">United Kingdom</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label class="text-bold-700 text-uppercase text-size-13">- City -</label>
                                        <select name="city_id" class="form-control rounded-0 bg-light-5">
                                            <option>-- City --</option>
                                            <option value="1">Lahore</option>
                                            <option value="2">Faisalabad</option>
                                            <option value="3">Karachi</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label class="text-bold-700 text-uppercase text-size-13">- Location -</label>
                                        <input type="text" name="location" class="form-control rounded-0 bg-light-5" placeholder="Enter Location Here">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-md-12">
                                    <h5 class="text-bold-700 text-uppercase m-top-10 m-bottom-20">Amenities</h5>
                                </div>

                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Air conditioning</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Balcony</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Bedding</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Cable TV</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Cofee pot</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Computer</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Cot</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Dishwasher</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">DVD</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Fan</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Fridge</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Grill</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Hairdryer</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Heating</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Hi-fi</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Internet</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Iron</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Juicer</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Lift</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Microwave</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Gym</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Fireplace</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Hot Tub</span>
                                            </label>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Cleaning after exit</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="row m-top-10">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-top-12 p-bottom-12 p-left-20 p-right-20"><i class="fa fa-search"></i> Search</button>
                                <a data-toggle="collapse" class="btn btn-default rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-top-12 p-bottom-12 p-left-20 p-right-20" href="#advanced_search"><i class="fa fa-cog"></i> Search Advance</a>
                            </div>
                        </div>

                    </div>
                    <!-- /SEARCH -->
                    
                    <!-- RECENTLY VIEW -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-20 box-shadow-1">
                                <h5 class="text-bold-700 m-bottom-10">RECENTLY VIEWED</h5>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <ul class="media-list">
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/property/property-1-150x130.jpg">
                                        <div class="media-content">
                                            <h5 class="text-bold-700 text-base">$250,000</h5>
                                            <h6><a class="text-dark text-base-hover" href="#">Beautiful Small Apartment</a></h6>
                                            <p class="address">253 Lake Washington, USA</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/property/property-2-150x130.jpg">
                                        <div class="media-content">
                                            <h5 class="text-bold-700 text-base">$120,000</h5>
                                            <h6><a class="text-dark text-base-hover" href="#">Beautiful Garaes Condo</a></h6>
                                            <p class="address">154 Drive, New York</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/property/property-3-150x130.jpg">
                                        <div class="media-content">
                                            <h5 class="text-bold-700 text-base">$145,000</h5>
                                            <h6><a class="text-dark text-base-hover" href="#">Global Land House</a></h6>
                                            <p class="address">110 Lake, United Kingdom</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /RECENTLY VIEW -->
                    
                    <!-- ENQUIRE FORM -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-20 box-shadow-1">
                                <h5 class="text-bold-700 m-bottom-10">ENQUIRE FORM</h5>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <form>
                                    <div class="form-group">
                                        <input type="text" class="form-control rounded-0" placeholder="Name">
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control rounded-0" placeholder="Email">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control rounded-0" placeholder="Phone">
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control rounded-0" rows="4" placeholder="Message"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-base rounded-0 text-bold-600 text-spacing-5 text-uppercase text-size-13 p-left-15 p-right-15" value="Submit">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /ENQUIRE FORM -->
                    
                    <!-- FEATURED PROPERTIES -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-20 box-shadow-1">
                                <h5 class="text-bold-700 m-bottom-10">FEATURED PROPERTIES</h5>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <div class="single-slider slick-single">
                                    <div>
                                        <div class="property m-bottom-15">
                                            <div class="property-media overlay-wrapper">
                                                <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/property/property-1.jpg">
                                                <div class="media-data">
                                                    <div class="position-top">
                                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                                    </div>
                                                    <div class="position-bottom">
                                                        <h2 class="text-white m-bottom-0 text-bold-700 pull-left">$250,000</h2>
                                                        <div class="clearfix"></div>
                                                        <p class="text-white m-bottom-0 pull-left">Per Month</p>
                                                        <div class="text-white text-size-18 pull-right line-height-0"><i class="fa fa-camera"></i> 12</div>
                                                    </div>
                                                </div>
                                                <div class="overlay bg-bg opacity-9"></div>
                                            </div>
                                            <div class="property-section">
                                                <div class="m-top-20 m-bottom-20">
                                                    <h5><a class="text-dark text-base-hover" href="#">Beautiful Small Apartment</a></h5>
                                                    <p>253 Lake Washington, USA</p>
                                                </div>
                                                <div class="bg-light-3 p-top-10 p-right-15 p-bottom-10 p-left-15">
                                                    <ul class="list-unstyled d-flex justify-content-between m-bottom-0">
                                                        <li><i class="m-right-4 fa fa-bed"></i> 5 Beds</li>
                                                        <li><i class="m-right-4 fa fa-tint"></i> 3 Baths</li>
                                                        <li><i class="m-right-4 fa fa-expand"></i> 36,000 Sq Ft</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="property m-bottom-15">
                                            <div class="property-media overlay-wrapper">
                                                <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/property/property-2.jpg">
                                                <div class="media-data">
                                                    <div class="position-top">
                                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Sale</div>
                                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                                    </div>
                                                    <div class="position-bottom">
                                                        <h2 class="text-white m-bottom-0 text-bold-700 pull-left">$120,000</h2>
                                                        <div class="clearfix"></div>
                                                        <p class="text-white m-bottom-0 pull-left">Per Month</p>
                                                        <div class="text-white text-size-18 pull-right line-height-0"><i class="fa fa-camera"></i> 6</div>
                                                    </div>
                                                </div>
                                                <div class="overlay bg-bg opacity-9"></div>
                                            </div>
                                            <div class="property-section">
                                                <div class="m-top-20 m-bottom-20">
                                                    <h5><a class="text-dark text-base-hover" href="#">Beautiful Garaes Condo</a></h5>
                                                    <p>154 Drive, New York</p>
                                                </div>
                                                <div class="bg-light-3 p-top-10 p-right-15 p-bottom-10 p-left-15">
                                                    <ul class="list-unstyled d-flex justify-content-between m-bottom-0">
                                                        <li><i class="m-right-4 fa fa-bed"></i> 4 Beds</li>
                                                        <li><i class="m-right-4 fa fa-tint"></i> 2 Baths</li>
                                                        <li><i class="m-right-4 fa fa-expand"></i> 45,000 Sq Ft</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="property m-bottom-15">
                                            <div class="property-media overlay-wrapper">
                                                <img alt="..." class="full-width" src="{{url('/')}}/frontend/images/property/property-1.jpg">
                                                <div class="media-data">
                                                    <div class="position-top">
                                                        <div class="badge badge-base text-white pull-left m-right-8 p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">Featured</div>
                                                        <div class="badge badge-success pull-left p-top-8 p-right-12 p-bottom-8 p-left-12 rounded-0">For Rent</div>
                                                        <div class="text-white text-size-24 pull-right"><a class="text-white text-base-hover" href="#"><i class="fa fa-heart-o"></i></a></div>
                                                    </div>
                                                    <div class="position-bottom">
                                                        <h2 class="text-white m-bottom-0 text-bold-700 pull-left">$145,000</h2>
                                                        <div class="clearfix"></div>
                                                        <p class="text-white m-bottom-0 pull-left">Per Month</p>
                                                        <div class="text-white text-size-18 pull-right line-height-0"><i class="fa fa-camera"></i> 14</div>
                                                    </div>
                                                </div>
                                                <div class="overlay bg-bg opacity-9"></div>
                                            </div>
                                            <div class="property-section">
                                                <div class="m-top-20 m-bottom-20">
                                                    <h5><a class="text-dark text-base-hover" href="#">Global Land House</a></h5>
                                                    <p>110 Lake, United Kingdom</p>
                                                </div>
                                                <div class="bg-light-3 p-top-10 p-right-15 p-bottom-10 p-left-15">
                                                    <ul class="list-unstyled d-flex justify-content-between m-bottom-0">
                                                        <li><i class="m-right-4 fa fa-bed"></i> 6 Beds</li>
                                                        <li><i class="m-right-4 fa fa-tint"></i> 3 Baths</li>
                                                        <li><i class="m-right-4 fa fa-expand"></i> 65,000 Sq Ft</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /FEATURED PROPERTIES -->

                    <!-- PROPERTY TYPE -->
                    <div class="row">
                        <div class="col-md-12 m-bottom-30">
                            <div class="bg-white card-body p-20 box-shadow-1">
                                <h5 class="text-bold-700 m-bottom-10">PROPERTY TYPE</h5>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <ul class="icon-list">
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Homes</a>
                                        <span>(10)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Plots</a>
                                        <span>(20)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Commercial</a>
                                        <span>(12)</span>
                                    </li>
                                    <li>
                                        <i class="btn btn-base fa fa-angle-double-right"></i>
                                        <a class="text-dark text-base-hover" href="#">Appartments</a>
                                        <span>(15)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /PROPERTY TYPE -->

                    <!-- RECENT POST -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="bg-white card-body p-20 box-shadow-1">
                                <h5 class="text-bold-700 m-bottom-10">RECENT POSTS</h5>
                    
                                <div class="hr dark text-left m-bottom-20">
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                    <div class="icons text-light">
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                    <hr class="border-3 border-double border-light border-left-0 border-top-0 border-right-0">
                                </div>

                                <ul class="media-list">
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/blog/blog-1-150x130.jpg">
                                        <div class="media-content">
                                            <div class="meta m-bottom-5">
                                                <i class="fa fa-user text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">admin</a>
                                                <i class="fa fa-comments text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">24</a>
                                            </div>
                                            <h6><a class="text-base text-base-dark-hover" href="#">Fuisset partiendo quo cu sadipscing</a></h6>
                                            <div class="meta">
                                                <i class="fa fa-calendar text-muted"></i> 25, Jan 2017
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/blog/blog-2-150x130.jpg">
                                        <div class="media-content">
                                            <div class="meta m-bottom-5">
                                                <i class="fa fa-user text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">admin</a>
                                                <i class="fa fa-comments text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">24</a>
                                            </div>
                                            <h6><a class="text-base text-base-dark-hover" href="#">Fuisset partiendo quo cu sadipscing</a></h6>
                                            <div class="meta">
                                                <i class="fa fa-calendar text-muted"></i> 25, Jan 2017
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <img alt="..." class="media-img" src="{{url('/')}}/frontend/images/blog/blog-3-150x130.jpg">
                                        <div class="media-content">
                                            <div class="meta m-bottom-5">
                                                <i class="fa fa-user text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">admin</a>
                                                <i class="fa fa-comments text-muted"></i>
                                                <a class="text-dark text-base-hover" href="#">24</a>
                                            </div>
                                            <h6><a class="text-base text-base-dark-hover" href="#">Fuisset partiendo quo cu sadipscing</a></h6>
                                            <div class="meta">
                                                <i class="fa fa-calendar text-muted"></i> 25, Jan 2017
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /RECENT POST -->

                </div>
                <!-- /SIDEBAR -->

            </div>

        </div>
    </div>
    <!-- End: PROPERTY -
    ################################################################## -->

@endsection