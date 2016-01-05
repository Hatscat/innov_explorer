var error = require("../error_formater.js")

function set_distance (socket, players, dist) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("distance", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(dist)) {
		socket.emit("err", error("distance", dist, "NaN"))
		return
	}

	players[socket.pseudo].distance_max = +dist

	console.log(players)
}

module.exports = set_distance
