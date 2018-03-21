/* eslint-disable semi */
'use strict'

var dot = require('dot-prop-immutable')

module.exports = {
	set: function(obj){return function(prop){return function(value){return dot.set(obj, prop, value)}}},
	get: function(obj){return function(prop){return dot.get(obj, prop)}},
	delete: function(obj){return function(prop){return dot.delete(obj, prop)}},
	toggle: function(obj){return function(prop){return dot.toggle(obj, prop)}},
	merge: function(obj){return function(prop){return function(value){return dot.merge(obj, prop, value)}}}
}
