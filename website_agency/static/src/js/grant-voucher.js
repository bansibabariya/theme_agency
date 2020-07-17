odoo.define('website_res_partner_form.grant-voucher', function(require) {
    'use strict';

    $(document).ready(function() {

    function myMap() {
    var cur_lat, cur_lng;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            cur_lat = position.coords.latitude
            cur_lng = position.coords.longitude
            if (cur_lat && cur_lng) {
                var mapProp = {
                    center: new google.maps.LatLng(cur_lat, cur_lng),
                    zoom: 5,
                };
            } else {
                var mapProp = {
                    center: new google.maps.LatLng(51.508742, -0.120850),
                    zoom: 5,
                };
            }
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            map.setZoom(8);

            var input = document.getElementById('pac-input');
            var autocomplete = new google.maps.places.Autocomplete(input);
             autocomplete.bindTo('bounds', map);

               autocomplete.setFields(
                        ['address_components', 'geometry', 'icon', 'name']);
                    var marker = new google.maps.Marker({
                      map: map,
                      anchorPoint: new google.maps.Point(0, -29)
                    });

              autocomplete.addListener('place_changed', function() {
                      marker.setVisible(false);
                      var place = autocomplete.getPlace();
                      if (!place.geometry) {
                        window.alert("No details available for input: '" + place.name + "'");
                        return;
                      }

                      if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                      } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);  // Why 17? Because it looks good.
                      }
                      marker.setPosition(place.geometry.location);
                      marker.setVisible(true);
                    });

            var geocoder = new google.maps.Geocoder;
            var infowindow = new google.maps.InfoWindow;
            var marker;
            google.maps.event.addListener(map, "click", function(e) {
                var latLng = e.latLng;
                var lat = e.latLng.lat()
                var lng = e.latLng.lng()
                $('#lat').val(lat)
                $('#lng').val(lng)
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': latLng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            map.setZoom(11);
                            $('#line1').val(results[1].formatted_address)
                        }
                    }
                });

                if (marker && marker.setMap) {
                    marker.setMap(null);
                }
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                });
            });
        })
    }
    else {
            alert("Geolocation is not supported by this browser.");
        }
}

        $('.many2mnay_select').select2({
            placeholder: 'Select',
            allowClear: true
        });

        jQuery.validator.addMethod(
            "validDOB",
            function(value, element) {
                var from = value.split("-"); // DD MM YYYY
                // var from = value.split("/"); // DD/MM/YYYY

                var year = from[0];
                var month = from[1];
                var day = from[2];

                var age = 18;

                var mydate = new Date();
                mydate.setFullYear(year, month - 1, day);

                var currdate = new Date();
                var setDate = new Date();


                setDate.setFullYear(mydate.getFullYear() + age, month - 1, day);

                if ((currdate - setDate) > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            "Sorry, you must be 18 years of age to apply"
        );

        $('#section_a_form')
            .validate({
                rules: {
                    birth_date: {
                        validDOB: true
                    }
                }
            });

        $("#regFormAddress").validate();

        $('.menu_a').click(function() {
            $('.hide_sec').hide()
            $('#section_a').show()
        });

        $('.menu_b').click(function() {
            $('.hide_sec').hide()
            $('#section_b').show()
        });

        $('.menu_c').click(function() {
            $('.hide_sec').hide()
            $('#section_c').show()
            myMap();

        });

        $('#delivery_type_select').change(function() {
           var data = $('#delivery_type_select').val()
           if(data == 'checkpoint'){
                $('#check_point_field').show()
                $('#delivery_notes_field').hide()
           }
           else{
                $('#check_point_field').hide()
                $('#delivery_notes_field').show()
           }
        });

        $('#delivery_type_select_edit').change(function() {
           var data = $('#delivery_type_select_edit').val()
           console.log("data===============",data)
           if(data == 'checkpoint'){
                console.log("data=========if======",data)
                $('#check_point_field_edit').removeClass('d-none')
                $('#delivery_notes_field_edit').addClass('d-none')
           }
           else{
                console.log("data=======else========",data)
                $('#check_point_field_edit').addClass('d-none')
                $('#delivery_notes_field_edit').removeClass('d-none')
           }
        });

        //only number allow in input field
        $(".numericOnly").bind('keypress', function(e) {
            if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
        });

    });

});

