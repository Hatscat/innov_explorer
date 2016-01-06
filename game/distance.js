var error = require("../error_formater.js")

function distance_handler (socket, players, dist2) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("distance2", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(dist2)) {
		socket.emit("err", error("distance2", dist2, "NaN"))
		return
	}

	players[socket.pseudo].distance2_max = +dist2
}

module.exports = distance_handler
