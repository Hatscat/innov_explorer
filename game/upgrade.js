var config = require("../config.js")
var error = require("../error_formater.js")
var users_db = require("../users_db.js")
var upgrades_parser = require("../upgrades_parser.js")

function upgrade_handler (socket, players, data) {

	if (!players[socket.pseudo]) {
		socket.emit("err", error("upgrade", socket.pseudo, "pseudo not found"))
		return
	}

	if (isNaN(data.upgrade)) {
		socket.emit("err", error("upgrade", data.upgrade, "upgrade is NaN"))
		return
	}

	if (data.upgrade < 0) {
		socket.emit("err", error("upgrade", data.upgrade, "upgrade is negative"))
		return
	}

	if (isNaN(data.choice)) {
		socket.emit("err", error("upgrade", data.choice, "choice is NaN"))
		return
	}

	if (data.choice < 0 || data.choice > 3) {
		socket.emit("err", error("upgrade", data.choice, "choice is out of range"))
		return
	}

	players[socket.pseudo].upgrades[Math.floor(data.upgrade)] = data.choice & 3

	users_db.set(socket.pseudo, upgrades_parser.encode(players[socket.pseudo].upgrades), function (err) {
		if (err) {
			console.error("level db 'put' error: ", err)
			socket.emit("err", error("login", err, "no way to save upgrades data"))
			return
		}

		console.log(players)
	})
}

module.exports = upgrade_handler

