/**
 * Created by juliovg on 16/07/14.
 */
define(function(require) {
    'use strict';


    var backbone            = require('backbone'),
        Lang                = require('i18n!internalization/nls/i18n'),
        busStopListView     = require('text!templates/BusStopList.html'),
        BusStop             = require('collections/busStopListCollection');

    var model = new backbone.Model();

    return backbone.View.extend({
        initialize: function (options) {
            var that = this;

            that.model = model;

            that.model.on("change:valueToSearch", that._onTenorChanged, that);

            this.render();
        },


        render: function() {
            var busStopListTemplate = _.template(busStopListView,{'Lang':Lang.forms});
            this.$el.html(busStopListTemplate);
        },

        setSearchValue: function (value) {
            var that = this;

            that.model.set("valueToSearch", value);

//            console.log('desde busStopList');
        },

        _onTenorChanged: function (model, value) {
            var that = this

            var BusStopCollection=new BusStop([],{query:value});

//            console.log(BusStopCollection);
            BusStopCollection.fetch({
                error: function (collection, response) {
//                    console.log('es UN error', response);
                },
                success: function (collection, response) {
//                    console.log('success', response);

                    $.each(response.arrivals, function(i,obj){

//                        console.log(obj);

                        $("#stopBusListNew").append("<tr><td>" + obj.routeId + "</td><td>" + obj.destination + "</td><td>" + obj.estimatedWait + "</td></tr>")

                    });


                }
            });

//            console.log('de prueba');
        },


        _onBackClicked: function() {
            var myNode = document.getElementById("stopBusListNew");
            myNode.innerHTML = '';


            this.trigger('changeView'); /* just if we wanna do something in the future with the back button*/ //, 'busStopIndexView');
            return false;
        },


        events: {
            'click .btn-primary': '_onBackClicked'
        }
    });


});