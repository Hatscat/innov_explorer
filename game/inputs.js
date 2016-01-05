var config = require("../config.js")
var error = require("../error_formater.js")

function inputs_handler (socket, players, data) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("inputs", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(data.direction)) {
		socket.emit("err", error("inputs", data.direction, "direction is NaN"))
		return
	}

	if (data.direction < -Math.PI || data.direction > Math.PI) {
		socket.emit("err", error("inputs", data.direction, "direction is out of the range"))
		return
	}

	players[socket.pseudo].direction = +data.direction

	if (players[socket.pseudo].can_pulse && data.pulse) {
		players[socket.pseudo].pulse_timer = config.pulse_duration // decrease while loop runs
	}

	players[socket.pseudo].can_pulse = !data.pulse && players[socket.pseudo].pulse_timer == 0
}

module.exports = inputs_handler
