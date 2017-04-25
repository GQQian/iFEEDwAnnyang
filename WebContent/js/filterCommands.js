/*
  Input: phrases of command
  process: detect if it's a valid command, therefore proceed or return null otherwise.
  Output: Info extracted from input phrase

 */

function extractFilter(phrases) {

	var allOptions = [ "present", "absent", "togetherIn", "notTogetherIn",
			"at least" ];
	var filteroption = "";
	for (i = 0; i < phrases.length; i++) {
		if (phrases[i].includes(" present"))
			filteroption = allOptions[0];
		if (phrases[i].includes(" absent"))
			filteroption = allOptions[1];
		if (phrases[i].includes("not together in"))
			filteroption = allOptions[3];
		if (phrases[i].includes("together in") && filteroption.length == 0)
			filteroption = allOptions[2];
		if (phrases[i].includes("at least "))
			filteroption = allOptions[4];
		if (phrases[i].includes("empty"))
			filteroption = "isEmpty";
		if (phrases[i].includes("cancel"))
			filteroption = "cancel";
		if (phrases[i].includes("hide"))
			filteroption = "hide";
	}
	if (filteroption.length == 0)
		return null;
	return filteroption;
}

function extractInstruments(phrases) {
	var speech_instruments = [ "A", "B", "C", "D", "E", "F", "G", "H", "I",
			"J", "K", "L" ];
	var telephony = [ "alpha", "beta", "charlie", "david", "echo", "foxtrot",
			"golf", "hotel", "india", "juliett", "kilo", "lima" ];
	var instruments = "";
	for (i = 0; i < phrases.length; i++) {
		phrase = phrases[i].toLowerCase();

		var tokens = phrase.split(" ");
		for (j = 0; j < tokens.length; j++) {
			for (k = 0; k < telephony.length; k++) {
				if (tokens[j] == telephony[k]) {
					if (instruments.length == 0) {
						instruments = speech_instruments[k];
					} else {
						if (!instruments.includes(speech_instruments[k])) {
							instruments += "," + speech_instruments[k];
						}
					}
				}
			}

		}
	}
	return instruments;
}

function extractOrbits(phrases) {
	var orbits = "";
	var speech_orbits = [ "1000", "2000", "3000", "4000", "5000" ];
	for (i = 0; i < phrases.length; i++) {
		phrase = phrases[i].toLowerCase();
		var tokens = phrase.split(" ");
		for (j = 0; j < tokens.length; j++) {
			for (k = 0; k < speech_orbits.length; k++) {
				if (tokens[j] == speech_orbits[k]) {
					if (orbits.length == 0) {
						orbits = speech_orbits[k];
					} else {
						if (!orbits.includes(speech_orbits[k])) {
							orbits += "," + speech_orbits[k];
						}
					}
				}
			}
		}
	}
	return orbits;

}

function voiceCreateFilter(filterType, Instruments, Orbits) {
	if(! (filterType.length = 0 || Instruments.length == 0)){
	//when the orbit input is empty
	if (Orbits.length == 0) {
		if (filterType = "absent") {
			var listIns = Instruments.split(",");
			for (i = 0; i < listIns.length; i++) {
				inputList = [];
				inputList.push(listIns[i]);
				applyFilter("absent", inputList);
			}
		}
		
		//This part should work, but it doesn't. Other sections need debugging
		if (filterType = "present") {
			console.log(Instruments);
			var listIns = Instruments.split(",");
			console.log(listIns);
			for (i = 0; i < listIns.length; i++) {
				console.log("filter apply");
				inputList = []
				inputList.push(listIns[i])
				applyFilter("present", inputList);
			}
		}

	} else {
		//when there are orbit inputs
		orbitList = Orbits.split(",");
		console.log(orbitList);
		for (i = 0; i < orbitList.length; i++) {
			//apply inOrbit filter or togetherInOrbit filter
			if (filterType == "present" || filterType == "togetherIn") {
				if (Instruments.length == 1 && orbitList.length == 1) {
					inputList = []
					inputList.push(orbitList[i]);
					inputList.push(Instruments);
					console.log(inputList);
					applyFilter("inOrbit", inputList);
				} else {
					console.log("here")
					inputList = []
					inputList.push(orbitList[i]);
					inputList.push(Instruments)
					applyFilter("togetherInOrbit",
							inputList);
				}
			}
			
			//apply notInOrbit filter
			if (filterType == "absent") {
				var listIns = Instruments.split(",");
				for ( j=0; j < listIns.length; j++) {
					inputList = [];
					inputList.push(orbitList[i]);
					inputList.push(listIns[j]);
					applyFilter("notInOrbit", inputList);
				}
			}
			
			//apply seperate filter
			if (filterType == "notTogetherIn" && Instruments.length > 1) {
				console.log("excute not together");
				inputList = [];
				inputList.push(Instruments);
				applyFilter("seperate", inputList);
			}
			
			//apply emptyOrbit filter
			if (filterType == "isEmpty") {
				inputList = [];
				inputList.push(orbitList[i]);
					applyFilter("emptyOrbit", inputList);
				
			}
		}
	}
	}
}

/*

 function extractInfoVoice(phrases) {

 var speech_instruments = [ "A", "B", "C", "D", "E", "F", "G", "H", "I",
 "J", "K", "L" ];
 var telephony = ["alpha", "beta", "charlie", "david", "echo", "foxtrot", "golf", "hotel", "india",
 "juliett", "kilo", "lima"];
 var speech_orbits = [ "1000", "2000", "3000",
 "4000", "5000" ];
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
 var orbitVar = ["orbit", "orbits", "orbitz"];
 for (i = 0; i < phrases.length; i++) {
 //console.log(phrases[i])
 if (phrases[i].includes("present"))
 filteroption = allOptions[0];
 if (phrases[i].includes("absent"))
 filteroption = allOptions[1];
 if (phrases[i].includes("not together in"))
 filteroption = allOptions[2];
 if (phrases[i].includes("together in") && filteroption.length() == 0)
 filteroption = allOptions[3];
 if (phrases[i].includes("at least"))
 filteroption = allOptions[4];
 if (phrases[i].includes("empty"))
 filteroption = "isEmpty";

 }
 // illegal filter input
 if (filteroption.length == 0)
 return null;
 for (i = 0; i < phrases.length; i++) {
 phrase = phrases[i].toLowerCase();
 var tokens = phrase.split(" ");
 for (j = 0; j < tokens.length; j++) {
 if (filteroption == "at least" && tokens[j] == "least"
 && isNAN(token[j + 1]) == false) {
 atleastNum = parseInt(token[j + 1], 10);
 break;
 }
 if (tokens[j] in telephony) {
 var index = telephony.indexOf(tokens[j]);
 if (instruments.length() == 0) {
 instruments = speech_instruments[index];
 } else {
 if(!instruments.includes(speech_instruments[index])){
 instruments += "," + speech_instruments[index];}
 }
 }

 if (tokens[j] in speech_orbits){
 if (orbits.length() == 0) {
 orbits = tokens[j];
 } else {
 if(!orbits.includes(tokens[i])){
 orbits += "," + orbits[j + 1];}
 }
 }

 if (i > 0) {
 if (orbitVar.includes(tokens[j]) && tokens[j - 1] == "any"){
 orbits = speech_orbits[0];
 for(k = 1; k < speech_orbits.length; k++){
 orbits += ","+speech_orbits[k];
 }
 }
 }
 }
 // iff orbits.length == 0, that means the user did not specify the
 // orbit(s), therefore treat it as
 // any orbits.
 }
 if (orbits.length == 0)
 orbits = speech_orbits;

 // get rid of illegal variable inputs
 if (filteroption == "at least" && atleastNum == 0)
 return null;
 if (filteroption == "present"
 && (instruments.length() == 0))
 return null;
 if (filteroption == "absent" && instruments.length() == 0)
 return null;
 if (filteroption == "togetherIn" && instruments.length() < 3)
 return null;
 if (filteroption == "notTogetherIn" && instruments.length() < 3)
 return null;

 return {
 filteroption : filteroption,
 instruments : instruments,
 orbits : orbits,
 atleastNum : atleastNum

 }

 }

 */

