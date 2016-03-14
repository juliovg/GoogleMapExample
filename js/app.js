/**
 * Created by juliovg on 16/07/14.
 */
define(function (require) {

    'use strict';

//    require('jquery');

    var Lang        = require('i18n'),
        Router      = require('router')
        $           = require('jquery'),
        _           = require('underscore');


//    require('underscore');


    var initialize = function(){

        // Pass in our Router module and call it's initialize function
        Router.initialize();

        //Internacionalizacion
        _.i18n = function(obji18n, data) {
            var val;
            for (val in obji18n) {
                data = data.replace(new RegExp('_'+val,'g'),obji18n[val]);
            }
            return data;
        };
    };

    return {
        initialize: initialize
    };
});