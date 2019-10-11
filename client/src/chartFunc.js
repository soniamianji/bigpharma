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
  console.log("rawData", rawData);

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
      if (typeof obj[i] == "object") {
        array = array.concat(search(obj[i], key, val));
      } else if (i == key && obj[key] == val) {
        array.push(obj);
      }
    }
    return array;
  }

  // Get an array of effectIDs
  var fxIDs = [];
  rawData.forEach(element => {
    fxIDs.push(element.effectId);
  });

  // Remove duplicates of effectIDs.
  effectIDs = removeDuplicates(fxIDs);
  console.log("effectIDs", effectIDs);

  //For each effect id compile an object with effectID as property and the resulting
  var fx = [];
  effectIDs.forEach(effectids => {
    var res = search(rawData, "effectId", effectids);

    var surveyIds = [];
    var surveyWithIntensity = [];
    var setOfIntensities = [];
    res.forEach(element => {
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
    var uniqeSurveyId = [...new Set(surveyIds)];

    //loop through the uniqe surveyIds and create the right number of arrays
    uniqeSurveyId.forEach(uniqSurv => {
      var uniquesurveyWithIntensity = new Array();
      //compare the unique surveyId with all the other surveyids to get the right intensity
      surveyWithIntensity.forEach(element => {
        if (uniqSurv == element.surveyId) {
          uniquesurveyWithIntensity.push(element.intensity);
        }
      });
      //now push it the set of intensities
      setOfIntensities.push(uniquesurveyWithIntensity);
    });

    var fxObj = {
      effectId: effectids,
      setOfSurveys: setOfIntensities
    };

    fx.push(fxObj);
  });

  console.log("fx:", fx);
};
