var util = require("util")

function error_formater (request_name, error_value, description) {

	return {
		request_name: util.inspect(request_name),
		error_value: util.inspect(error_value),
		description: util.inspect(description)
	}
}

module.exports = error_formater

