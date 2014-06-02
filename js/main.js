var app = angular.module('app', []);
app.controller('CalendarCtrl', function($scope) {
    var currentTime = new Date();
	var yr = currentTime.getFullYear();
	var month = currentTime.getMonth();
		
	function loadCalendarData(monthDifferential) {
		var firstDay = new Date(yr, month+monthDifferential, 1);
		var lastDay = new Date(yr, month+monthDifferential + 1, 0);
		
		$scope.current =
		{
			"month" : monthNames[firstDay.getMonth()],
			"year" : 1900+firstDay.getYear()
		}
		
		firstDay = firstDay.getDay(3);
		var daysInMonth = lastDay.getDate();
		
		$scope.dates = [];
		var counter = 1;
		for (var i = 0; i < 35; i++) {
			if (i < firstDay) {
				var newDate =
					{
						"class":"blank",
						"date":" "
					}
				$scope.dates.push(newDate);
			} else if (i >= (firstDay + daysInMonth)) {
				var newDate =
					{
						"class":"blank",
						"date":" "
					}
				$scope.dates.push(newDate);
			} else {
				var newDate =
					{
						"class":"white",
						"date":counter
					}
				$scope.dates.push(newDate);
				counter++;
			}	
		}
		$scope.$apply();
	}
	
	loadCalendarData(0);
	
	$scope.changeMonth = function(diff) {
		console.log('month changed');
		var realDiff = monthDifferentialCounter + diff;
		loadCalendarData(realDiff);
		monthDifferentialCounter = realDiff;
	}
    
});