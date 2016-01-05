function decode (hex) { // : Array<int>

	var arr = []
	
	for (var l = hex.length - 1, i = l; i >= 0; --i) {
		
		var u = (l - i) * 2
		var c = parseInt(hex[i], 16)

		arr[u] = c & 3
		arr[u+1] = (c & 12) >> 2
	}

	return arr
}

function encode (arr) { // String

	var hex = ""
	
	for (var i = 0; i < arr.length; i += 2) {
		hex = ((arr[i+1] << 2) | arr[i]).toString(16) + hex 
	}

	return hex || "0"
}

function add (hex, upgrade_id, upgrade_choice_id) { // Array<int>

	var arr = decode(hex)

	arr[Math.floor(upgrade_id)] = upgrade_choice_id & 3

	return arr
}

module.exports = {
	decode: decode,
	encode: encode,
	add: add
}
