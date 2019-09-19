// Build the script here.

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
		if (typeof obj[i] == 'object') {
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
//console.log('That 4 belongs to [1,3] is', isBetween(4, 1, 3));

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
//var nums = [ null, null, 3 ];
//console.log('Averages [null, null, 3]', average(nums));

//// Funtion that translates UNIX timestamps to HH:MM:SS
/* @param unixtimestamp
    /* returns var
    */
function hhmmss(unixtimestamp) {
	var time = new Date(unixtimestamp * 1000);
	var hours = time.getHours() - 1; /// NOTE (-1) bug fix
	var minutes = '0' + time.getMinutes();
	var seconds = '0' + time.getSeconds();

	// Will display time in 10:30:23 format
	var hhmmss = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return hhmmss;
}

// END of HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

var computation = {
	type: 'line',
	data: {
		labels: [ '00:00:00', '00:00:30', '00:01:00', '00:01:30', '00:02:00' ],
		datasets: [
			{
				// One line on the graph (set of effects)
				label: 'Headache',
				data: [ 9, 5, 4, 3, 0 ],
				backgroundColor: [ 'rgba(54,73,93,.25)' ]
			},
			{
				// Another line graph (set of effects)
				label: 'Tooth ache',
				data: [ 6, 8, 3, 2, 0 ],
				backgroundColor: [
					'rgba(71, 183,132,.25)' // Green
				]
			}
		]
	},
	options: {
		responsive: true,
		legend: {
			display: true,
			position: 'right'
		}
	}
};

export const chartData = computation;
export default chartData;
