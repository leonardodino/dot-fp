/* eslint-disable semi */
'use strict'

var dot = require('dot-prop-immutable')

module.exports = {
	set: function(prop){return function(value){return function(obj){return dot.set(obj, prop, value)}}},
	get: function(prop){return function(obj){return dot.get(obj, prop)}},
	delete: function(prop){return function(obj){return dot.delete(obj, prop)}},
	toggle: function(prop){return function(obj){return dot.toggle(obj, prop)}},
	merge: function(prop){return function(value){return function(obj){return dot.merge(obj, prop, value)}}}
}
