/**
 * Created by juliovg on 16/07/14.
 */
define(function (require) {
    'use strict';

    var backbone                = require('backbone'),
        Lang                    = require('i18n!internalization/nls/i18n'),
        findView                = require('text!templates/findView.html'),
        BusStopListView         = require('views/busStopListView'),
        BusStopMapView          = require('views/busStopMapView'),
        SearchComponentView     = require('views/searchComponentView'),
        SearchComponentModel    = require('views/searchComponentModel');


    return backbone.View.extend({
        initialize: function (options) {
            this.model = new backbone.Model();

            this._views = {

                searchView: new SearchComponentView({
                    model: new SearchComponentModel({
                        searchFieldValue  : this.model.get('searchField')
                    })
                }),

                busStopListView: new BusStopListView({

                }),

                busStopMapView: new BusStopMapView({

                })

            };

            this._views.busStopListView.on('changeView', this._onStartSearchBusStopList, this);
            this._views.busStopMapView.on('geocode:click', this._onStartSearchBusStopList, this);

            this._views.searchView.on("startSearchBusStopList", this._onStartSearchBusStopList, this);
            this._views.searchView.on("startSearchCloseBusStop", this._onStartSearchBusStopList, this);




        },


        _onStartSearchBusStopList: function (viewName) {
            var that = this;

            if(viewName == 'busStopListView') {

                var searchBox = that._views.searchView.getSearchValue();
                that.model.set("searchBoxValue", searchBox);
                this._views.busStopListView.setSearchValue(searchBox);

            } else if(viewName == 'busStopMapView') {

                that.model.set("searchBusStopClose", true);
                this._views.busStopMapView.setSearchBusStopClose(that.model.get('searchBusStopClose'))

            } else if(viewName == 'findScheduleFromStop'){

                var busStopNumber = that._views.busStopMapView.getBusStopValue()
                that.model.set("searchBoxValue", busStopNumber);
                this._views.busStopListView.setSearchValue(busStopNumber);
            }

//            viewName || (viewName = 'searchView');


            _.each(this._views, function (view, ident) {
                view.$el.hide();
            });

            if(viewName == 'busStopListView' || viewName == 'findScheduleFromStop') {
//                this._views[viewName].$el.show();
                this._views['busStopListView'].$el.show();
            }else{
                this._views['searchView'].$el.show();
                this._views['busStopMapView'].$el.show();
            }


//            console.log('_onStartSearchBusStopList - desde findView');
        },


        _onStartSearchCloseBusStop: function (evt) {
            var that = this;

//            console.log('desde findView');
        },



        render: function() {
            var findTemplate = _.template(findView); //,{'Lang':Lang.forms});
            this.$el.html(findTemplate);


            this._views.searchView.setElement($('#searchView'));
            this._views.searchView.render();

            this._views.busStopListView.setElement($('#listView'));
            this._views.busStopListView.render();

            this._views.busStopMapView.setElement($('#mapView'));
            this._views.busStopMapView.render();


//            var findTemplate = _.template(findView,{'Lang':Lang.forms});
//            this.$el.html(findTemplate);

        }

    });

});