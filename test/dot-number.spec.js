var dotProp = require('../imperative');

describe('dot-number.spec.js', function () {

	var arr = [1, {a: false}];

	var result;
	describe('when have an array', () => {

		describe('when set prop using number as path', () => {

			before(function () {
				result = dotProp.set(arr)(1)(3);
			});

			it('should replace prop', () => {
				expect(result).to.eql([
				1,
				3
				]);
			});

			it('invariant', arrInvariant);
		});


		describe('when get prop using number as path', () => {

			before(function () {
				result = dotProp.get(arr)(1);
			});

			it('should get prop', () => {
				expect(result).to.eql({a: false});
			});

			it('invariant', arrInvariant);
		});

		describe('when delete prop using number as path', () => {

			before(function () {
				result = dotProp.delete(arr)(1);
			});

			it('should remove prop', () => {
				expect(result).to.eql([
				1
				]);
			});
			it('invariant', arrInvariant);
		});
	});

	function arrInvariant() {
		expect(arr).to.eql(
		[1, {a: false}]
		);
	}
});


