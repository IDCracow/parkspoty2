'use strict';

angular.module('parkspotyappApp').directive('drawMonths', function(Draw, adminViewModel) {
    return {
        restrict: 'E', 
        replace: true,
        controller: function($scope) {
            $scope.availableMonths = [];
            
            Draw.getDrawMonths().then(function(result){                
                $scope.availableMonths = result;
            });
        },
        link: function($scope, element) {
            var dropdownItem = null;             
            $scope.drawMonth = null;
            $scope.drawYear = null;
            
            $scope.checkSelection = function (e) {
                var selectedDrawDate = e.target[e.target.selectedIndex].value;
                dropdownItem = e.target;
                
                if(selectedDrawDate != 0) 
                {
                    var selectedDrawDate = selectedDrawDate.split('_');
                    $scope.drawMonth = selectedDrawDate[0];
                    $scope.drawYear = selectedDrawDate[1];  
                    $scope.isDisabled = false; 
                } else {
                    $scope.isDisabled = true;
                }
            };
            
            $scope.doDraw = function(){
                if($scope.drawMonth != 0 && $scope.drawYear !=0) 
                {
                    adminViewModel.drawSpots(parseInt($scope.drawMonth), parseInt($scope.drawYear)).then(function(result) {
                        angular.element(dropdownItem).parent().addClass('success');
                    }); 
                }
            };
        },
        templateUrl: "/scripts/directives/drawMonths/drawMonths.html",
        
        
    };
});
