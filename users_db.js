var level = require("level")
var config = require("./config.js")

var db = level(config.users_db_path)

function get (key, callback) {

	db.get(key, callback)
}

function set (key, value, callback) {

	db.put(key, value, callback)
}

module.exports = {
	get: get,
	set: set
}

