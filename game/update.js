var config = require("../config.js")
var error = require("../error_formater.js")
var tools = require("../math_tools.js")

var players_data_2_send = []
var meteors = []
var _time = process.hrtime()

// map dans la config?

function update (players) {

	var deltatime = process.hrtime(_time)[1] * 1e-9
	_time = process.hrtime()

	var distances = {}

	// ---- update ---- //

	// * moves --> loop 1
	// * set a filtred players array --> loop 1
	// * collisions --> loop 1
	// * send data --> loop 2

	/*
	 player = {
		pseudo:,
		x: 0,
		y: 0,
		dir: 0,
		upgrades: [],
		pulse: false,
		distances: [],
	 }

	 */

	for (var p in players) {

		if (!players[p] || !players[p].socket) {
			continue
		}

		if (!players[p].stop) {

			if (players[p].pulse_timer > 0) {
				players[p].pulse_timer -= deltatime 
				players[p].speed = config.pulse_speed

			} else {
				players[p].pulse_timer = 0
				players[p].speed = config.default_speed
			}

			players[p].coord.x += Math.cos(players[p].coord.dir) * players[p].speed * deltatime
			players[p].coord.y += Math.sin(players[p].coord.dir) * players[p].speed * deltatime
		}

		players_data_2_send[players_data_2_send.length] = {
			//pseudo: p,
			coord: players[p].coord,
			upgrades: players[p].upgrades,
			pulse: players[p].pulse_timer != 0
		}

	}

	// ---- emits ---- //

	for (var p in players) {

		if (!players[p] || !players[p].socket) {
			continue
		}

		var data = {
			x: players[p].coord.x,
			y: players[p].coord.y,
			dir: players[p].coord.dir,
			players: players_data_2_send
		}

		players[p].socket.emit("update", data)
	}

	//console.log(deltatime)
	setTimeout(update.bind(null, players), config.update_interval)
	//process.nextTick(update, players) // too fast
}

function visible_players (p) { // : filter cb
	// not player && < dist2
}

module.exports = update

