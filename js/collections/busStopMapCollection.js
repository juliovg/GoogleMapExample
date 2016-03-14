/**
 * Created by juliovg on 20/07/14.
 */
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/busStopMapModel'
], function(_, Backbone, BusStopMap){


    var BusStopMapCollection = Backbone.Collection.extend({
        model: BusStopMap,


        initialize : function(models, options) {
            this.query = function()
            {
                q = '';
                q = 'bus-stops?';

                $.each(options.query, function(i,obj){

                    q+=i + '=' +  obj.x + ',' + obj.y + '&';

//                    console.log('cadena: ' + q);
                });

                return q.substr(0,(q.length-1));
            };
        },



        url: function ()
        {
            return 'http://digitaslbi-id-test.herokuapp.com/'+this.query();
        },


        sync: function(method, model, options) {
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: model.url(),
                processData: false
            }, options);

//            console.log(params);
//            console.log(Backbone.sync(method, model, params));

            params.dataType = "jsonp";
            return Backbone.sync(method, model, params);
        },


        parse: function(response) {

//            console.log(response);

            return response;
        }

    });

    return BusStopMapCollection;
});