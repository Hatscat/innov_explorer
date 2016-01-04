var level = require("level")
var config = require("../config.js")
var error = require("../error_formater.js")

var db = level(config.users_db_path)

function login (socket, players, pseudo) {
	
	console.log("pseudo: ", pseudo)
	
	pseudo += '' // to string

	if (pseudo.length < config.pseudo_min_length) {
		console.log("pseudo too short: ", pseudo)
		socket.emit("err", error("login", pseudo, "pseudo too short"))
		return
	}

	if (pseudo.length > config.pseudo_max_length) {
		console.log("pseudo too long: ", pseudo)
		socket.emit("err", error("login", pseudo, "pseudo too long"))
		return
	}

	if (players[pseudo]) {
		console.log("double connexion: ", pseudo)
		socket.emit("err", error("login", pseudo, "already use"))
		return
	}

	db.get(pseudo, "level", function (err, data) {

		var upgrades = data || config.default_upgrades_value

		if (err) { // new pseudo

			console.log("level db error: ", err)

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
			stop: true,
			distance_max: config.distance_min,
			pulse_timer: 0
		}

		socket.pseudo = pseudo

		socket.emit("upgrades", upgrades)
	})
}

module.exports = login

