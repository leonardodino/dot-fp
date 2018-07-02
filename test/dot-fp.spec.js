var mock = require('mock-require');

var ternary = function(a, b, c){return a + b + c; };
var binary = function(a, b){return a + b; };

mock('dot-prop-immutable', {
	set: ternary,
	get: binary,
	delete: binary,
	toggle: binary,
	merge: ternary
});

var dotFp = require('..');

describe('dot-fp.spec.js', function() {
	it('should set', () => {
		expect(dotFp.set('a')('b')('-')).to.eql('-ab');
	});
	it('should get', () => {
		expect(dotFp.get('a')('-')).to.eql('-a');
	});
	it('should delete', () => {
		expect(dotFp.delete('a')('-')).to.eql('-a');
	});
	it('should toggle', () => {
		expect(dotFp.toggle('a')('-')).to.eql('-a');
	});
	it('should merge', () => {
		expect(dotFp.merge('a')('b')('-')).to.eql('-ab');
	});
});

mock.stopAll();
