var config = require("../config.js")
var error = require("../error_formater.js")

function inputs_handler (socket, players, data) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("inputs", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(data.dir)) {
		socket.emit("err", error("inputs", data.dir, "dir is NaN"))
		return
	}

	if (data.dir < -Math.PI || data.dir > Math.PI) {
		socket.emit("err", error("inputs", data.dir, "dir is out of the range"))
		return
	}

	players[socket.pseudo].coord.dir = +data.dir

	if (players[socket.pseudo].can_pulse && data.pulse) {
		players[socket.pseudo].pulse_timer = config.pulse_duration // decrease while loop runs
	}

	players[socket.pseudo].can_pulse = !data.pulse && players[socket.pseudo].pulse_timer == 0
}

module.exports = inputs_handler
