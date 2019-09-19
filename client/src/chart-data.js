// Recieved object of oberservations has the following criteria:
// 1) must only belong to 1 compound.
// 2) must belong to a completed survey (survey completed != null)

// # 1 - Create an array of the effectNames (no dublicates)
// # 2 - Pipe each elemt of that array through the effects compiler, returns a an array of objects.

///////////////////////////

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
