var error = require("../error_formater.js")

function stop (socket, players, is_stop) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("stop", socket.pseudo, "pseudo not found"))
		return
	}

	players[socket.pseudo].stop = is_stop == true
}

module.exports = stop
