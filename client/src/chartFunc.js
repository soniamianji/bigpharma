module.exports.chartFunction = function chartFunction(observations) {
	const rawData = [];
	for (var i = 0; i < observations.length; i++) {
		const obsObj = {
			id: observations[i].id,
			surveyId: observations[i].surveyId,
			userId: observations[i].userId,
			compoundId: observations[i].compoundId,
			effectId: observations[i].effectId,
			entryTime: observations[i].entryTime,
			effectIntensity: observations[i].effectIntensity
		};
		rawData.push(obsObj);
	}
	console.log('rawData', rawData);

	// 1. The longest array of all effects will determine the structure of the timeline. Its the timeline-divisor
	// fx{} => effectIDn[[xn],[xn],[xn]]

	//// Removes dublicate intigers from array
	/*
  * @param (array[])
  /* returns array[]
  */
	function removeDuplicates(num) {
		var x,
			len = num.length,
			out = [],
			obj = {};

		for (x = 0; x < len; x++) {
			obj[num[x]] = 0;
		}
		for (x in obj) {
			out.push(x);
		}
		return out;
	}

	//// Search an object ie: getObjects(observations, 'effect_name', 'headache');
	/*
    * @param (obj{}, "val", "val")
    /* returns obj[]
    */
	function getObjects(obj, key, val) {
		var objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(getObjects(obj[i], key, val));
			} else if (i == key && obj[key] == val) {
				objects.push(obj);
			}
		}
		return objects;
	}

	// Get an array of effectIDs
	var fxIDs = [];
	rawData.forEach((element) => {
		fxIDs.push(element.effectId);
	});

	// Remove duplicates of effectIDs.
	effectIDs = removeDuplicates(fxIDs);
	console.log('effectIDs', effectIDs);

	effectIDs.forEach((element) => {});
};
