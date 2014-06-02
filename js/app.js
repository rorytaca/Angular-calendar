
var dayNames = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
var monthDifferentialCounter = 0;

angular.module('app', ['draggable']).
    factory('loadCalendarData', function () {
        return {
            load: function(yr,month,monthDifferential) {
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
        }
    }.
    controller('Calendar', function($scope,loadCalendarData) {
        

            //Generate calendar dates array
            var currentTime = new Date();
            yr = currentTime.getFullYear();
            month = currentTime.getMonth(); 

            loadCalendarData.load(yr,month,0);
            
            $scope.changeMonth = function(diff) {
                    console.log('month changed');
                    var realDiff = monthDifferentialCounter + diff;
                    loadCalendarData(yr,month,realDiff);
                    monthDifferentialCounter = realDiff;
            }	
        }
});