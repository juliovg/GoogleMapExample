/**
 * Created by juliovg on 20/07/14.
 */
define(function(require) {
    'use strict';


    var backbone = require('backbone'),
        Lang = require('i18n!internalization/nls/i18n'),
        busStopInfoView = require('text!templates/BusStopInfoView.html');

    var model = new backbone.Model();

    return backbone.View.extend({

        initialize: function (options) {
            var that = this;

//            that.model = options && options.model ? options.model : {};
            this.model = options;

            this.render();
        },


        render: function () {
            var templateData = this.model;

            var busStopInfoTemplate = _.template(busStopInfoView, templateData);
            this.$el.html(busStopInfoTemplate);
        },


        _onFindBusStopList: function() {

//            console.log('pruebas sssssss');

            this.trigger('save', 'test');
        },


        events: {
//            'click .text-center': '_onFindBusStopList',

            'click button.btn-default' : '_onFindBusStopList'


        }
    })

})