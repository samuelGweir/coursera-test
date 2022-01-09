(function () {
'use strict';

angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
   $scope.placeHolder = "list comma separated dishes you usually have for lunch";
   $scope.getMessage = function (){
     if($scope.text == ""){
      $scope.message = "Please enter data first";
     }
     else if ($scope.text.split(",").length <= 3){
      $scope.message = "Enjoy!";
     }
     else if ($scope.text.split(",").length > 3){
       $scope.message = "Too much!"
     }
   }
}

})();
