define([
   'underscore',
   'backbone',
   // Pull in the Model module from above
   'models/busStopModel'
], function(_, Backbone, BusStop){
	
	
   var BusStopList = Backbone.Collection.extend({
	  model: BusStop,
      
      
      initialize : function(models, options) {
         this.query = function()
         {
             q = '';
             q = 'bus-stops/' + options.query;

             return q;
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

//		 console.log(params);
//		 console.log(Backbone.sync(method, model, params));

          params.dataType = "jsonp";
          return Backbone.sync(method, model, params);
      },
       
       
      parse: function(response) {
       
//         console.log(response);
       
         return response;
      }
       
   });
   
   return BusStopList;
});