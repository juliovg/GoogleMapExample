/**
 * Created by juliovg on 17/07/14.
 */
define(function(require) {
    'use strict';


    var backbone                = require('backbone'),
        googleMapLib            = require('googleMap'),
        Lang                    = require('i18n!internalization/nls/i18n'),
        busStopListView         = require('text!templates/BusStopMap.html'),
        BusStopInfoView         = require('views/busStopInfoView'),
        BusStopMap              = require('collections/busStopMapCollection');

    var model = new backbone.Model();

    return backbone.View.extend({

        el: '#mapView',
        template:_.template(busStopListView),

        initialize: function(options){
            var that = this;
            that.model = model;
            that.model.on("change:showBusStationAround", that._onshowBusStationAround, that);

            this.myReference= {"northEast":
                                    {x:"51.51560467", y:"-0.10225884"},
                                "southWest":
                                    {x:"51.52783450", y:"-0.04076115"}
                                }


            this.image = new google.maps.MarkerImage(
                "./img/bus-stop.png",           //url
                new google.maps.Size(32, 32),   //size
                new google.maps.Point(0, 0),    //origin
                new google.maps.Point(0, 32),   //anchor
                new google.maps.Size(30, 30));  //scaledSize


            this.closeBusStop = [];


            this.markers = [];
            this.iterator = 0;

            this.infowindow = new google.maps.InfoWindow();

            this.map;

            this.createMap();

        },

        setSearchBusStopClose: function (value) {
            var that = this;
            that.model.set("showBusStationAround", value);
        },

        _onshowBusStationAround:function(model, value){
            var that = this
//            console.log('le hemos dado click al boton de buscar paradas cercanas');


            /*TODO esto es llamada al servicio*/
            if(value)
            {
                var BusStopMapCollection=new BusStopMap([],{query:this.myReference});
            }

            BusStopMapCollection.fetch({
                error: function (collection, response) {
//                    console.log('es UN error', response);
                },
                success: function (collection, response) {
//                    console.log('success', response);
                    var recorre = 0;
                    $.each(response.markers, function(i,obj) {

//                        if (recorre <= 4) {
                            that.closeBusStop.push(obj);

                            /*TODO, add a little of animation, but we comment this because we have a lot of stop's*/
//                            setTimeout(function() {
                                that.addMarker(recorre);
//                            }, i * 200);

                            recorre++
//                        }
                    });
                    recorre = 0;
                }
            });
        },


        addMarker:function(element) {
            var that = this;
            var layerInformation;

            var p = this.closeBusStop[element];
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            var infoButStop = p.id;

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: that.image,
                title: infoButStop,
                draggable: false,
                animation: google.maps.Animation.DROP
            });

            /*we will prepare a smal info view*/
            /*TODO, OPCION 1*/
            var content2 = '<div class="dl-horizontal">' +
                '<!--header-->' +
                '<dt>Bus stop</dt>' +
                '<dd class="myClass">' + p.id + '</dd>' +

                '<!--body-->' +
                '<dt class="lookSchedule">See Schedule</dt>' +
                '</div>'


            /*TODO, OPCION 2*/
            var content3 = '<div id="content">' +
                    '<p>Stop Number <strong>' + p.id + '</strong></p>' +
                    '<p class="text-center">Click the icon for details</p>' +
                '</div>'


            /*TODO, OPCION 3*/
            layerInformation = new BusStopInfoView(this.closeBusStop[element]);
            layerInformation.on('save', this._onBusStopLis, this);
            var content = layerInformation.$el[0].innerHTML;



            /*TODO, 3 important case's*/
//            google.maps.event.addListener(marker, 'click', function() {
//                that.infowindow.setContent(content3);
//                that.infowindow.open(map, this);
//            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                that.infowindow.setContent(content3);
                that.infowindow.open(map, this);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                that.infowindow.setContent(content3);
                that.infowindow.close(map, this);
            });


            /*TODO, prepared to open the information with mouse, over the icon*/
//            google.maps.event.addListener(marker, 'mouseover', this.showBusStopDetail);
//            google.maps.event.addListener(marker, 'mouseout', this.showBusStopDetail);




            //ESTE VA
//            google.maps.event.addListener(marker, 'click', this.onClickOverInfoLayer);
            google.maps.event.addListener(
                marker,
                'click',
                $.proxy(this.mapClicked, this)
            );



            this.markers.push(marker);

            that.iterator++;
        },



        mapClicked: function(event) {
            var kCord = event.latLng.k;
            var BCord = event.latLng.B;

            var kPosition, BPosition, busStop;

            for (var i = 0; i < this.markers.length; ++i) {
                kPosition = this.markers[i].position.k;
                BPosition = this.markers[i].position.B;

                if(kCord == kPosition && BCord == BPosition){
                    busStop = this.markers[i].title;
//                    console.log('encontrada la parda: ' + this.markers[i].title);

                    break;
                }
            }


            if(!_.isUndefined(busStop)) {
                this.model.set({'busStopNumber': busStop});

                this.trigger("geocode:click", 'findScheduleFromStop');
            }
        },


        getBusStopValue:function(){
            return this.model.get('busStopNumber');
        },

        onClickOverInfoLayer:function(){
            var that = this;
//            console.log('algo');

            that.trigger('busStopList', 'busStopMapView');

        },


        myfunction:function(){
//            console.log('mi funcion 1.');
        },


        _onBusStopLis:function(viewName){
//            console.log('desde el layer de un marcador.');
        },



        /*TODO, prepared to open the information with mouse, over the icon*/
//        showBusStopDetail:function(){
//            this..infowindow.open(map, this);
//        },


        /*GoogleMap config*/
        configGoogleMap:function(position) {
            var that = this
            var mapcanvas = document.createElement('div');
            mapcanvas.id = 'mapcontainer';
            mapcanvas.style.height = '100%';
            mapcanvas.style.width = '100%';

            document.querySelector('#map_canvas').appendChild(mapcanvas);

            /* TODO, this to get our current location*/
            //var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var coords = new google.maps.LatLng(51.523045, -0.070854);


            var options = {
                zoom: 15,
                center: coords,
                mapTypeControl: false,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            /*aqui va la antigua vista de informacion*/
            var contentString = '<div class="dl-horizontal">' +
                '<!--header-->' +
                '<dt>Your are here</dt>' +
                '</div>'


            var contentString1 = '<div id="content">' +
                '<p><strong>You are here</strong></p>' +
                '</div>'

            var infowindow = new google.maps.InfoWindow({
                content: contentString1
            });

            /* TODO: esto esta mal en la visualizacion en moviles
            * deberia ser :
            * var map = new google.maps.Map(document.getElementById("mapcontainer"), options);
            * REVISAR*/
             this.map = new google.maps.Map(document.getElementById("mapcontainer"), options);


            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                title:"You are here!"
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
        },


        createMap:function(){
            if (navigator && navigator.geolocation) {
                var that = this;
                navigator.geolocation.getCurrentPosition(this.configGoogleMap);
            }
        },

        render: function(){
            this.$el.html(this.template);
        }

    })
});
