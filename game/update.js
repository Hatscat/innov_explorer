var error = require("../error_formater.js")

function update (socket, players, deltatime) {

	/*if (!players[socket.pseudo]) {
		socket.emit("err", error("update", socket.pseudo, "pseudo not found"))
		return
	}*/

	// emit only, no request
}

module.exports = update

