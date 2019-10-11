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
};
