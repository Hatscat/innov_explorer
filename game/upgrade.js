var error = require("../error_formater.js")

function set_distance (socket, players, dist) {

	if (isNaN(dist)) {
		socket.emit("error", error("set_dist", dist, "NaN"))
		return
	}

	players[socket.pseudo].distance_max = +dist
}

module.exports = set_distance
