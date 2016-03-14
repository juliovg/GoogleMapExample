/**
 * Created by juliovg on 16/07/14.
 */
define(function (require) {
    'use strict';


    var backbone    = require('backbone'),
        Lang        = require('i18n!internalization/nls/i18n'),
        searchView  = require('text!templates/SearchComponentView.html');

    require('modelBinder');

    var model = new backbone.Model();

    return backbone.View.extend({

        initialize: function () {
            this.modelBinder = new Backbone.ModelBinder();

            // Model is passed in.
//            this.model = options.model;
            this.model = model;

            this.render();
        },

        render: function () {

            var searchTemplate = _.template(searchView,{'Lang':Lang.forms});
            this.$el.html(searchTemplate);

        },


        getInputElement: function() {
            return this.$('.searchValue');
        },

        getInputValue: function() {
            return this.getInputElement().val();
        },

        _onKeyUp: function(event) {

            this.isInsideInput = true;
            var which = event.which;

            var fieldValue = this.getInputValue(); // replace with event.target.value

//            console.log('agregando texto' + fieldValue);

            var numericStop = Number(fieldValue);

            if(fieldValue != ""){
                this.model.set({'searchFieldValue': numericStop});
            }

        },

        getSearchValue:function(){
            return this.model.get('searchFieldValue');
        },

        _onBusStopList: function(event) {
//            console.log('_onBusStopList - desde searchComponentView');

            this.trigger('startSearchBusStopList', 'busStopListView');
            return false;
        },

        _onCloseBusStop: function(event) {
//            console.log('desde searchComponentView');

            this.trigger('startSearchCloseBusStop', 'busStopMapView');

            return false;
        },

        bindings: {
            buttoSearch: '.btn-primary'
        },

        events: {
            'keyup .searchValue'    : '_onKeyUp',

            'click .btn-warning'    : '_onBusStopList',
            'click .btn-primary'    : '_onCloseBusStop'
        }
    });
});