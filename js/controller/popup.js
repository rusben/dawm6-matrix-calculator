// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  
  angular.module('MatrixCalculatorApp').controller('PopUpController', ['$scope', '$window', function($scope, $window) {
    // Controller properties
    this.matrixDataA;
    this.matrixDataB;
    this.matrixDataC;
    this.matrixDimension;
    $scope.action;
    
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

    this.initialize = function () {
      /*
      // Injected via opener
      
      this.matrixDataA = $window.matrixDataA;
      this.matrixDataB = $window.matrixDataB;
      this.matrixDataC = $window.matrixDataC;
      this.matrixDimension = $window.matrixDimension;
      $scope.action = $window.action;
      */

      // Load data from the window opener using angular object
      this.matrixDataA = $window.opener.angular.element('#matrix-calculator-ctrl').scope().MatrixCtrl.matrixDataA;
      this.matrixDataB = $window.opener.angular.element('#matrix-calculator-ctrl').scope().MatrixCtrl.matrixDataB;
      this.matrixDataC = $window.opener.angular.element('#matrix-calculator-ctrl').scope().MatrixCtrl.matrixDataC;
      this.matrixDimension = $window.opener.angular.element('#matrix-calculator-ctrl').scope().MatrixCtrl.matrixDimension;
      $scope.action = $window.opener.angular.element('#matrix-calculator-ctrl').scope().action;

    };

    this.initialize();

  }]);

  angular.module('MatrixCalculatorApp').directive("matrixResultViewForm", function () {
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
