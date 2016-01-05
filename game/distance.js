var error = require("../error_formater.js")

function distance_handler (socket, players, dist) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("distance", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(dist)) {
		socket.emit("err", error("distance", dist, "NaN"))
		return
	}

	players[socket.pseudo].distance_max = +dist
}

module.exports = distance_handler
