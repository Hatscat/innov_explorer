module.exports = {

	lerp: function (from, to, t) {
		return from + (t < 0 ? 0 : t > 1 ? 1 : t) * (to - from);
	},
	sign: function (n) {
		return n < 0 ? -1 : 1;
	},
	dist_3d_sqrt: function (a, b) {
		var dx = a.x - b.x;
		var dy = a.y - b.y;
		var dz = a.z - b.z;
		return dx * dx + dy * dy + dz * dz;
	},
	dist_2d_sqrt: function (a, b) {
		var dx = a.x - b.x;
		var dz = a.z - b.z;
		return dx * dx + dz * dz;
	},
	loop_index: function (index, length) {
		return (length + (index % length)) % length;
	},
	sum: function () {
		var sum = 0;
		for (var i = arguments.length; i--;) {
			sum += arguments[i];
		}
		return sum;
	},
	average: function () {
		return sum.apply(null, arguments) / arguments.length;
	}
}

