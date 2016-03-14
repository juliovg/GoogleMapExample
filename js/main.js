require.config({
  paths: {
    jquery          : 'libs/jquery/jquery-1.9.1',
    underscore      : 'libs/underscore/underscore',
    text            : 'libs/require/text',
    domReady        : 'libs/require/domReady',
    backbone        : 'libs/backbone/backbone-min',
    modelBinder     : "libs/backbone/modelBinder/Backbone.ModelBinder",
    collectionBinder: "FX/lib/backbone/modelBinder/Backbone.CollectionBinder",
    bootstrap       : 'libs/bootstrap/bootstrap.min',
    chosen          : 'libs/chosen/chosen.jquery.min',
    googleMap       : 'libs/google/googleMap',
    async           : 'libs/sync/async',
    json2           : 'libs/json2/json2',
    i18n	        : 'i18n'
    },


    shim: {
      underscore    : {
        exports: '_'
      } ,

      backbone      : {
        deps: ["underscore", "jquery", "json2"],
        exports: "Backbone"
      }
    },


    config          : {
      i18n: {
        locale: 'es'
      }
    }
});

require(['jquery', 'app'], function($,App){
//	console.log('calling App.js');
    
	$(function () {
        window.App=App;
		App.initialize();
    });
});
