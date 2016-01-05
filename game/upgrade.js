var error = require("../error_formater.js")

function upgrade_handler (socket, players, up_val) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("upgrade", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(up_val)) {
		socket.emit("err", error("upgrade", up_val, "NaN"))
		return
	}

	players[socket.pseudo].upgrades |= up_val

	console.log(players)
}

module.exports = upgrade_handler
