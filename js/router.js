/**
 * Created by juliovg on 16/07/14.
 */
define(function (require) {
    'use strict';

    var backbone    = require('backbone'),
        FindView    = require('views/findView');

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        home:function()
        {
            var findView = new FindView({
                el: $('body')
            });

            findView.render();
        }

    });



    var initialize = function(){
        var app_router = new AppRouter();
        window.App.router=app_router;
        Backbone.history.start();
    };




    return {
        initialize: initialize
    };

});