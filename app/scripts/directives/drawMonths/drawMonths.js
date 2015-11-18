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
             $scope.drawMonth = null;
            $scope.drawYear = null;
            
            $scope.checkSelection = function () {
                
                var selectedDrawDate = $scope.drawmonths;
                 
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
                        angular.element(element).addClass('success');
                    }); 
                }
            };
        },
        templateUrl: "/scripts/directives/drawMonths/drawMonths.html",
        
        
    };
});
