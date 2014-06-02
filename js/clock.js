/* Vanilla JS functions */
function timeFormat(num) {
	return ( num < 10 ? "0" : "" ) + num;
}
function hourFormat(num) {
	if (num < 10) {
		return "0"+num;
	} if (num > 12) {
		num = num%12;
		return ( num < 10 ? "0" : "" ) + num;
	}
}

/* AngularJS Specific functions */
function ClockCtrl($scope) {
	/*Initial values */
	var currentTime = new Date();
	$scope.hours = hourFormat(currentTime.getHours());
	$scope.minutes = timeFormat(currentTime.getMinutes());
	$scope.seconds = timeFormat(currentTime.getSeconds());
	
	var clock = setInterval(function() {
		var updateTime = new Date();
		$scope.hours = hourFormat(updateTime.getHours());
		$scope.minutes = timeFormat(updateTime.getMinutes());
		$scope.seconds = timeFormat(updateTime.getSeconds());
		$scope.$apply();
	},1000);
}