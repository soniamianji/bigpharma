const effectClient = require('./SDK/effectsSDK');

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
	function search(obj, key, val) {
		var array = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				array = array.concat(search(obj[i], key, val));
			} else if (i == key && obj[key] == val) {
				array.push(obj);
			}
		}
		return array;
	}

	// Get an array of effectIDs
	var fxIDs = [];
	rawData.forEach((element) => {
		fxIDs.push(element.effectId);
	});

	// Remove duplicates of effectIDs.
	effectIDs = removeDuplicates(fxIDs);
	console.log('effectIDs', effectIDs);

	//For each effect id compile an object with effectID as property and the resulting
	var fx = [];
	effectIDs.forEach((effectids) => {
		var res = search(rawData, 'effectId', effectids);

		var surveyIds = [];
		var surveyWithIntensity = [];
		var setOfIntensities = [];
		res.forEach((element) => {
			//create an obj with surveyIds and intensities
			var obj = {
				surveyId: element.surveyId,
				intensity: element.effectIntensity
			};
			surveyWithIntensity.push(obj);

			//get all the surveyIds
			surveyIds.push(element.surveyId);
		});

		//create a uniqe set of surveyIds so we can compare them later on
		var uniqeSurveyId = [ ...new Set(surveyIds) ];

		//loop through the uniqe surveyIds and create the right number of arrays
		uniqeSurveyId.forEach((uniqSurv) => {
			var uniquesurveyWithIntensity = new Array();
			//compare the unique surveyId with all the other surveyids to get the right intensity
			surveyWithIntensity.forEach((element) => {
				if (uniqSurv == element.surveyId) {
					uniquesurveyWithIntensity.push(element.intensity);
				}
			});
			//now push it the set of intensities
			setOfIntensities.push(uniquesurveyWithIntensity);
		});

		var fxObj = {
			effectId: effectids,
			effectName: '',
			setOfSurveys: setOfIntensities,
			avgIntensity: ''
		};

		fx.push(fxObj);
	});

	//averaging the intensities
	fx.forEach((element) => {
		const result = element.setOfSurveys
			.reduce((r, a) => {
				a.forEach((n, i) => {
					const { sum = 0, count = 0 } = r[i] || {};

					r[i] = { sum: sum + n, count: count + 1 };
				});

				return r;
			}, [])
			.map(({ sum, count }) => sum / count);

		element.avgIntensity = result;
	});

	var avgIntensity = [];
	fx.forEach((element) => {
		avgIntensity.push(element.avgIntensity);
	});

	//find the devisor
	function timeLineDivisor(someSeries) {
		var indexOfLongestArray = someSeries
			.map(function(a) {
				return a.length;
			})
			.indexOf(
				Math.max.apply(
					Math,
					avgIntensity.map(function(a) {
						return a.length;
					})
				)
			);
		return someSeries[indexOfLongestArray].length;
	}
	var timeLineDivisor = timeLineDivisor(avgIntensity);
	console.log(timeLineDivisor);

	//get the effectName by effectId
	fx.forEach((element) => {
		effectClient.getEffectById(element.effectId, (err, effect) => {
			if (err.length == 0) {
				element.effectName = effect[0].effectName;
			} else {
				console.log(err);
			}
		});
	});

	console.log('fx:', fx);

	/////////////////////////////////////////
	// Timeline (Labels)
	// 1 - get tAlpha (first entrytime)
	// 2 - get tOmega (last entrytime)
	// 3 - Timeline = tOmega-tAlpha
	// 4 - sequense = timeline / timelineDivisor
	// 5 - labels[tN] = loop through timelineDivisor. Each loop: labels.push(Sequense*X), where X =  timelineDivisor

	// Create an array of all entryTimes
	var allEntryTimes = [];
	rawData.forEach((element) => {
		allEntryTimes.push(element.entryTime);
	});

	console.log('allEntryTimes:', allEntryTimes);

	// Get tAlpha & tOmega
	var tAlpha = allEntryTimes[0];
	var tOmega = allEntryTimes[allEntryTimes.length - 1];
	var nowtAlpha = new Date(tAlpha);
	var timeLpha = nowtAlpha.getHours() + ':' + nowtAlpha.getMinutes() + ':' + nowtAlpha.getSeconds();

	var nowttOmega = new Date(tOmega);
	var timetOmega = nowttOmega.getHours() + ':' + nowttOmega.getMinutes() + ':' + nowttOmega.getSeconds();

	console.log('tAlpha:', timeLpha);
	console.log('tOmega:', timetOmega);

	// Calculate timeline
	var timeline = tOmega - tAlpha;
	console.log('timeline:', timeline);

	console.log('timeLineDivisor:', timeLineDivisor);

	// Sequence
	var sequence = timeline / timeLineDivisor;
	console.log('sequence:', sequence);

	// Labels
	var labels = [];
	for (var i = 0; i < timeLineDivisor; i++) {
		var timestamp = sequence * i;
		if (i == 0) {
			labels.push('00:00:00');
		} else {
			var now = new Date(timestamp);
			var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
			labels.push(time);
		}
	}

	console.log('lables:', labels);

	var datasets = [];
	fx.forEach((element) => {
		var obj = {
			label: element.effectName,
			data: element.avgIntensity
		};
		console.log(element);
		datasets.push(obj);
	});
	var values = [ labels, datasets ];
	console.log(datasets);
	return values;
};
