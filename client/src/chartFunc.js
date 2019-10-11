module.exports.chartFunction = function chartFunction(observations) {
  const testData = [];
  for (var i = 0; i < observations.length; i++) {
    const obsObj = {
      id: observations[i].id,
      surveyId: observations[i].surveyId,
      userId: observations[i].userId,
      compoundId: observations[i].compoundId,
      effectId: observations[i].effectId,
      effectName: observations[i].effectName,
      entryTime: observations[i].entryTime,
      effectIntensity: observations[i].effectIntensity
    };

    testData.push(obsObj);
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  // START of HELPER FUNCTIONS
  //// Search an object ie: getObjects(observations, 'effect_name', 'headache');
  /*
  * @param (obj{}, "val", "val")
  /* returns obj{}
  */
  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == "object") {
        objects = objects.concat(getObjects(obj[i], key, val));
      } else if (i == key && obj[key] == val) {
        objects.push(obj);
      }
    }
    return objects;
  }
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
  //// Function to test if a value t is within range x1 and x2.
  /*
/* @param (int, int, int)
/* returns TRUE / FALSE
*/
  function isBetween(timestamp, x1, x2) {
    return timestamp >= x1 && timestamp <= x2;
  }
  console.log("That 4 belongs to [1,3] is", isBetween(4, 1, 3));
  //// Funtion that calculate the average of an array if intergers
  /*
/* @param ([int,int])
/* returns int
*/
  function average(array) {
    // Removes NaN
    var filteredArray = array.filter(function(el) {
      return el != null;
    });
    // Averages the array using lowdash: https://lodash.com/docs/4.17.15#mean
    return _.mean(filteredArray);
  }
  var nums = [1, 2, 3];
  console.log("Averages [1, 2, 3]", average(nums));
  //// Funtion that translates UNIX timestamps to HH:MM:SS
  /* @param unixtimestamp
/* returns var
*/
  function hhmmss(unixtimestamp) {
    var time = new Date(unixtimestamp * 1000);
    var hours = time.getHours() - 1; /// NOTE (-1) bug fix
    var minutes = "0" + time.getMinutes();
    var seconds = "0" + time.getSeconds();
    // Will display time in 10:30:23 format
    var hhmmss = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return hhmmss;
  }

  // END of HELPER FUNCTIONS
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  //// Takes an effectname, compiles and averages the set from it into an array
  /*
  /* @param series("string",object{})
  /* returns array[]
  */
  function effect(effectName, obsObject) {
    // DETERMINE NUMBER OF OBSERVATIONSETS GIVEN EFFECT
    var theseEffects = getObjects(obsObject, "effectName", effectName);
    console.log("theseEffects:", theseEffects);
    var sets = [];
    theseEffects.forEach(element => {
      sets.push(element.surveyId);
    });

    var reducedSets = removeDuplicates(sets);
    console.log(reducedSets);
    var sets = [];
    reducedSets.forEach(function(element) {
      var set = [];
      var subset = getObjects(obsObject, "surveyId", element);
      subset.forEach(elemental => {
        set.push(elemental.effectIntensity);
      });
      sets.push(set);
    });
    console.log("sets", sets);
    function remap(data) {
      return _.map(_.unzip(data)); // maps the array on the y axis using: https://lodash.com/docs/4.17.15#map
    }
    var reMappedSets = remap(sets);
    var series = [];
    reMappedSets.forEach(function(element) {
      series.push(average(element));
    });
    console.log(series);
    return series;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Creates labels for chart
  /*
  /* @param object{}
  /* returns array[]
  */
  function timestamps(object, timeLineDivisor) {
    var timestamps = object.map(element => element.entryTime);
    var tMin = Math.min.apply(null, timestamps);
    var tMax = Math.max.apply(null, timestamps);
    var timeframe = tMax - tMin;
    var timeFraction = timeframe / timeLineDivisor;
    console.log("Timestamps", timestamps);
    console.log("Timespan in UNIX-time-units (timeframe)", timeframe);
    console.log("timeLineDivisor:", timeLineDivisor);
    console.log("timeFraction:", timeFraction);
    console.log("timeFraction Math.ceil", Math.ceil(timeFraction));

    // Creates an array of the observation lenght
    // Note: "timeframe + 1" to compensate for origo of index 0
    var timeframeArray = Array.from(Array(timeframe + 1).keys());
    // var timeframeArray = new Array(timeframe);
    // for (var i = 0; i < timeframeArray.length; i++) {
    //   timeframeArray.fill(timeframeArray[i], 0, timeframeArray.length);
    // }
    // console.log(timeframeArray);

    //console.log("timeframeArray", timeframeArray);
    // Splits the timeframeArray into an array of complete intervals
    Object.defineProperty(Array.prototype, "chunk", {
      value: function(chunkSize) {
        var that = this;
        return Array(Math.ceil(that.length / chunkSize))
          .fill(0)
          .map(function(_, i) {
            return that.slice(i * chunkSize, i * chunkSize + chunkSize);
          });
      }
    });
    // Splits timeframeArray into filled intervals ie [1,2,3],[4,5,6]
    var intervals = timeframeArray.chunk(timeFraction);
    console.log("Intervals", intervals);
    // Splice intervals to contain only start and end points ie [1,2,3] => [1,3]
    var discreteIntervals = [];
    for (var key in intervals) {
      if (intervals.hasOwnProperty(key)) {
        var interval = intervals[key];
        function kvantIntervals(array) {
          var startPoint = interval[0];
          var endPoint = interval[interval.length - 1];
          var objOutput = {
            x1: startPoint + tMin,
            x2: endPoint + tMin,
            timestampsCont: []
          };
          return objOutput;
        }
        var discreteInterval = kvantIntervals(interval);
        discreteIntervals.push(discreteInterval);
      }
    }
    console.log("discreteIntervals", discreteIntervals);
    // Nested loop to evaluate and pair timestamps to discreteIntervals
    testData.forEach(element => {
      var thisTimestamp = element.entryTime;
      discreteIntervals.forEach(element => {
        if (isBetween(thisTimestamp, element.x1, element.x2)) {
          element.timestampsCont.push(thisTimestamp); // Push timestamp to array
        }
      });
    });
    // Looping through discreteIntervals{} to average timestamp[] and collect as labels[]
    var averagedTimestamps = [];
    discreteIntervals.forEach(element => {
      // check is entry is empty
      if (
        element.timestampsCont.length > 0 ||
        element.timestampsCont == undefined
      ) {
        // Average contents in arrays
        var averaged = average(element.timestampsCont);
        averagedTimestamps.push(_.floor(averaged)); // lowdash to remove decimals https://lodash.com/docs/4.17.15#floor
      }
    });
    console.log("avgtimestamps", averagedTimestamps);
    //// Set timestamps to X seconds after origo where origo is the first timestamp
    var origo = averagedTimestamps[0];
    console.log("origo:", origo);
    var fromOrigo = [];
    averagedTimestamps.forEach(element => {
      var next = element - origo;
      console.log(next);
      fromOrigo.push(new Date(next).toLocaleTimeString());
    });
    // SETS first time entry to 00:00:00
    //  fromOrigo.shift();
    fromOrigo.unshift("00:00:00");
    var labels = fromOrigo;
    return labels;
  }
  ///////////////////////////////////////////////////
  // get an array of effects from the observations.
  var effects = ["pain", "dixiu"];
  console.log("testData:", testData);
  //// GRAPH OBJECT
  const datasets = [];
  ////// START OF EFFECTS-COMPILER //////////////////
  var _series = [];
  effects.forEach(function(element) {
    console.log("effectName:", element);
    var fx = effect(element, testData);
    console.log("fx", fx);
    _series.push(fx);
    var eachObj = {
      label: element,
      data: fx
    };
    datasets.push(eachObj);
  });
  console.log("datasets", datasets);
  /// RESULTS //////////////////////////////////
  var series = _series; // Used by Timeline-Compiler to Fetch labels on (x-axis).
  /// END OF EFFECTS-COMPILER //////////////////
  ///// START OF TIMELINE-COMPILER /////////////////////
  // Finds the longest array from a set and returns the length of that array - 1.
  // This is used to divide the timeframe over which the effects are plotted.
  function timeLineDivisor(someSeries) {
    var indexOfLongestArray = someSeries
      .map(function(a) {
        return a.length;
      })
      .indexOf(
        Math.max.apply(
          Math,
          _series.map(function(a) {
            return a.length;
          })
        )
      );
    return someSeries[indexOfLongestArray].length - 1;
  }
  var timeLineDivisor = timeLineDivisor(_series);
  /// RESULTS //////////////////////////////////
  let thoselabels = timestamps(testData, timeLineDivisor);
  /// END OF EFFECTS-COMPILER //////////////////
  console.log("thoselabels", thoselabels);
  const values = [thoselabels, datasets];
  return values;
};
