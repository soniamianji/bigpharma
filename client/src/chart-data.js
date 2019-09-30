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
				data: [ 9, 5, 4, 3, 0 ]
			},
			{
				// Another line graph (set of effects)
				label: 'Tooth ache',
				data: [ 6, 9, 3, 2, 0 ]
			},
			{
				// Another line graph (set of effects)
				label: 'X9292',
				data: [ 2, 3, 7, 1, 0 ]
			},
			{
				// Another line graph (set of effects)
				label: 'Viwewew',
				data: [ 0, 1, 2, 9, 0 ]
			},
			{
				// One line on the graph (set of effects)
				label: 'Hwewe',
				data: [ 9, 5, 4, 3, 0 ]
			},
			{
				// Another line graph (set of effects)
				label: 'Twewewe',
				data: [ 6, 9, 3, 2, 0 ]
			},
			{
				// Another line graph (set of effects)
				label: 'Pweweewe',
				data: [ 2, 4, 8, 2, 1 ]
			}
		]
	},
	options: {
		responsive: true,
		legend: {
			display: true,
			position: 'right',
			labels: {
				fontColor: 'white'
			}
		},
		scales: {
			xAxes: [
				{
					display: true,
					gridLines: {
						display: true,
						color: '#7c7c7c'
					},
					scaleLabel: {
						display: true,
						labelString: 'Time',
						color: '#7c7c7c'
					}
				}
			],
			yAxes: [
				{
					display: true,
					gridLines: {
						display: true,
						color: '#7c7c7c',
						fontColor: 'white'
					},
					scaleLabel: {
						display: true,
						labelString: 'Intensity',
						color: '#7c7c7c'
					}
				}
			]
		},

		plugins: {
			colorschemes: {
				scheme: 'office.Aspect6'
			}
		}
	}
};

export const chartData = computation;
export default chartData;
