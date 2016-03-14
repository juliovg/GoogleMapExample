/**
 * Created by juliovg on 17/07/14.
 */
define(function(require) {

    'use strict';


    var backbone = require('backbone'),
        Lang = require('i18n!internalization/nls/i18n');

    var SearchComponentModel = Backbone.Model.extend({
        defaults: function () {
            return {
                searchFieldValue: 0
            };
        }
    })

    return SearchComponentModel;

});