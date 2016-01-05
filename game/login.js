var level = require("level")
var config = require("../config.js")
var error = require("../error_formater.js")

var db = level(config.users_db_path)

function login_handler (socket, players, pseudo) {
	
	pseudo += '' // to string

	if (pseudo.length < config.pseudo_min_length) {
		socket.emit("err", error("login", pseudo, "pseudo too short"))
		return
	}

	if (pseudo.length > config.pseudo_max_length) {
		socket.emit("err", error("login", pseudo, "pseudo too long"))
		return
	}

	if (players[pseudo]) {
		socket.emit("err", error("login", pseudo, "pseudo already used"))
		return
	}

	if (socket.pseudo) {
		socket.emit("err", error("login", pseudo, "user already logged"))
		return
	}

	db.get(pseudo, "level", function (err, data) {

		var upgrades = data || config.default_upgrades_value

		if (err) { // new pseudo

			db.put(pseudo, upgrades, function (err) {
				if (err) {
					console.error("level db 'put' error: ", err)
					socket.emit("err", error("login", err, "no way to store this new pseudo"))
					return
				}
				
			})
		}

		players[pseudo] = {
			upgrades: upgrades,
			x: 0,
			y: 0,
			direction: 0,
			distance_max: config.distance_min,
			pulse_timer: 0,
			can_pulse: true,
			stop: true // default value ?
		}

		socket.pseudo = pseudo

		socket.emit("upgrades", upgrades)
	})
}

module.exports = login_handler

