// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  // This is the instance of our angular app
  var app = angular.module("MatrixCalculatorPopUp", []);

  app.controller("PopUpController", function($scope, $window) {
    // Controller properties
    this.matrixDataA = $window.matrixDataA;
    this.matrixDataB = $window.matrixDataB;
    this.matrixDataC = $window.matrixDataC;
    this.matrixDimension = $window.matrixDimension;
    $scope.action = $window.action;
    
    // Get an Array with dimension num
    $scope.getNumber = function(num) {
      var a = []; 
      for(var i=0; i<num; i++) a.push(i);
      return a;
    }

    $scope.actionSymbol = function(action) {
      if (action == "add") return "+";
      if (action == "substract") return "-";
      if (action == "multiply") return "*";
    };

  });

    app.directive("matrixResultViewForm", function () {
    return {
      restrict: 'E', // type of directive
      templateUrl:"../../view/templates/matrix-result-view-form.html",
      controller: function() {
        // When the document is ready execute this code
      },
      controllerAs: 'matrixResultViewFormCtrl' // This is the alias
    };
  });

})();
