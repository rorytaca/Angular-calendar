
var dayNames = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var holidays = 
[
	{	
		"holiday":"Christmas",
		"month": "December",
		"date": 25
	},
	{	
		"holiday":"New Years",
		"month": "January",
		"date": 1
	},	
	{	
		"holiday":"Valentines Day",
		"month": "February",
		"date": 14
	}
];

var monthDifferentialCounter = 0;
/* AngularJS Specific functions */

angular.module('calendar', [])
	.controller('CalendarCtrl', function($scope) {
		//Generate calendar dates array
		var currentTime = new Date();
		var yr = currentTime.getFullYear();
		var month = currentTime.getMonth();
		var today = currentTime.getDate();

		function loadCalendarData(monthDifferential) {
			var firstDay = new Date(yr, month+monthDifferential, 1);
			var lastDay = new Date(yr, month+monthDifferential + 1, 0);
			var mnth = firstDay.getMonth();
			$scope.current =
			{
				"month" : monthNames[mnth],
				"year" : 1900+firstDay.getYear()
			}
			
			firstDay = firstDay.getDay(3);
			var daysInMonth = lastDay.getDate();
			
			$scope.dates = [];
			var counter = 1;
			for (var i = 0; i < 35; i++) {
				
				var td = ''; 
				var holiday = '';
				//Check if current kernel's date is a holiday from array
				if (counter == today && monthDifferential == 0) {
					td += ' today';
				}
				if (i < firstDay) {
					var newDate =
						{
							"class":"blank",
							"date":" ",
							"notifications": ""
						}
					$scope.dates.push(newDate);
				} else if (i >= (firstDay + daysInMonth)) {
					var newDate =
						{
							"class":"blank",
							"date":" ",
							"notifications": ""
						}
					$scope.dates.push(newDate);
				} else {
					holiday = _.findWhere(holidays, { month: $scope.current.month, date: parseInt(counter) })
					console.log('month: ' + $scope.current.month + ' date: ' + counter);
					if (holiday) {
						console.log('holiday found at: '+holiday.holiday + monthNames[mnth] + " " + counter);
						holiday = holiday.holiday;
					} else {
						holiday = '';
					}
					
					var newDate =
						{
							"class":"white"+td,
							"date": counter,
							"holiday": holiday,
							"notifications": ""
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
		
		// function to submit the form after all validation has occurred			
		$scope.submitForm = function() {
			console.log('sbmt pressed');
			// check to make sure the form is completely valid
			if ($scope.userForm.$valid) {

			}
		}
		
		$scope.dateboxClick = function() {
			console.log('datebox clicked');
		}
	})
	/* validation */
	.directive('match',['$parse', function ($parse) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('match', currentValue);
                });
            }
        };
    }])
	/* jQuery plugins */
	.directive('draggable', function() {
		 return {
			// A = attribute, E = Element, C = Class and M = HTML Comment
			restrict:'A',
			//The link function is responsible for registering DOM listeners as well as updating the DOM.
			link: function(scope, element, attrs) {
				element.draggable();
			}
		};
	});
