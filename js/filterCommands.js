/*
  Input: phrases of command
  process: detect if it's a valid command, therefore proceed or return null otherwise.
  Output: Info extracted from input phrase

 */

function voice_create_filter(phrases) {

	var speech_instruments = [ "A", "B", "C", "D", "E", "F", "G", "H", "I",
			"J", "K", "L" ];
	var speech_orbits = [ "one thousand", "two thousand", "three thousand",
			"four thousand", "five thousand" ];
	var logic = [ "at least", "at most", "is empty", "has no", "have no" ];
	var contains_action = false;
	var contains_logic = false;
	var contains_instrument = false;
	var allOptions = [ "present", "absent", "togetherIn", "notTogetherIn",
			"at least" ];
	var orbits = "";
	var instruments = "";
	var filteroption = "";
	var atleastNum = 0;
	for ( var phrase in phrases) {

		if (phrase.includes(" present"))
			filteroption = allOptions[0];
		if (phrase.includes(" absent"))
			filteroption = allOptions[1];
		if (phrase.includes(" not together in "))
			filteroption = allOptions[2];
		if (phrase.includes("together in") && filteroption.length() == 0)
			filteroption = allOptions[3];
		if (phrase.includes("at least "))
			filteroption = allOptions[4];

	}
	// illegal filter input
	if (filteroption.length() == 0)
		return null;
	for ( var phrase in phrases) {
		var tokens = phrase.split(" ");
		for (i = 0; i < tokens.length - 1; i++) {
			if (filteroption == "at least" && tokens[i] == "least"
					&& isNAN(token[i + 1]) == false) {
				atleastNum = parseInt(token[i + 1], 10);
				break;
			}
			if (tokens[i] == "instrument"
					&& tokens[i + 1] in speech_instruments) {
				if (instruments.length() == 0) {
					instruments = tokens[i + 1];
				} else {
					instruments += "," + tokens[i + 1];
				}

			}

			if (tokens[i] == "orbit" && tokens[i + 1] in speech_orbits){
				if (orbits.length() == 0) {
					orbits = tokens[i + 1];
				} else {
					orbits += "," + orbits[i + 1];
				}
				
				
			}

			if (i > 0) {
				if (tokens[i] == "orbit" && tokens[i - 1] == "any")
					orbits = speech_orbits;
			}
		}
		// if orbits.length == 0, that means the user did not specify the
		// orbit(s), therefore treat it as
		// any orbits.
	}
	if (orbits.length == 0)
		orbits = speech_orbits;

	// get rid of illegal variable inputs
	if (filteroption == "at least" && atleastNum == 0)
		return null;
	if (filteroption == "present"
			&& (orbits.length == 0 || instruments.length == 0))
		return null;
	if (filteroption == "absent" && instruments.length == 0)
		return null;
	if (filteroption == "togetherIn" && instruments.length < 2)
		return null;
	if (filteroption == "notTogetherIn" && instruments.length < 2)
		return null;

	return {
		filteroption : filteroption,
		instruments : instruments,
		orbits : orbits,
		atleastNum : atleastNum

	}

}