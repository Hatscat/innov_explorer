var config = require("../config.js")
var error = require("../error_formater.js")
var users_db = require("../users_db.js")
var upgrades_parser = require("../upgrades_parser.js")

function login_handler (socket, players, pseudo) {
	
	pseudo = pseudo.toString().trim()

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

	players[pseudo] = {} // reserved

	users_db.get(pseudo, function (err, data) {

		var upgrades_hex = data || config.default_upgrades_value
		var upgrades = upgrades_parser.decode(upgrades_hex)

		if (err) { // new pseudo

			users_db.set(pseudo, upgrades_hex, function (err) {
				if (err) {
					console.error("level db 'put' error: ", err)
					socket.emit("err", error("login", err, "no way to store this new pseudo"))
					return
				}
			})
		}

		if (players[pseudo]) { // if not deco while db search

			players[pseudo] = {
				socket: socket,
				upgrades: upgrades,
				coord: {
					x: 0,
					y: 0,
					dir: 0
				},
				speed: config.default_speed,
				collider_radius: config.default_collider_radius,
				distance2_max: config.distance2_min,
				pulse_timer: 0,
				can_pulse: true,
				stop: true // default value ?
			}

			socket.pseudo = pseudo

			socket.emit("upgrades", upgrades)
		}
	})
}

module.exports = login_handler

