// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  // This is the instance of our angular app
  var app = angular.module("MatrixCalculatorApp", []);

  app.controller("MatrixController", function($scope) {
    // Controller properties
    this.matrixDimension = 3;
    this.matrixRange = 0;
    this.matrixDataA;
    this.matrixDataB;
    this.matrixDataC;

    // Scope variables 
    // Initial values
    $scope.action = "add";

    this.invalidDimension = function ($scope) {
      return isNaN(this.matrixDimension);
    };
    

    this.invalidRange = function ($scope) {
      return isNaN(this.matrixRange);
    };


    /* http://stackoverflow.com/questions/35218517/storing-the-data-in-array-using-ng-model */
    // Scope functions
    $scope.actionSymbol = function(action) {
      if (action == "add") return "+";
      if (action == "substract") return "-";
      if (action == "multiply") return "*";
    };

    // Get an Array with dimension num
    $scope.getNumber = function(num) {
      var a = []; 
      for(var i=0; i<num; i++) a.push(i);
      return a;
    }

    this.initializeFields = function () {
      if (!isNaN(this.matrixDimension)) {
        this.matrixDataA = [];
        this.matrixDataB = [];
        this.matrixDataC = [];
        for (var i = 0; i < this.matrixDimension; i++) {
          this.matrixDataA[i] = [];
          this.matrixDataB[i] = [];
          this.matrixDataC[i] = [];
          for (var j = 0; j < this.matrixDimension; j++) {
            this.matrixDataA[i][j]="0";
            this.matrixDataB[i][j]="0";
            this.matrixDataC[i][j]=0; // We need the value later in the multiply
          }
        }
      }
    };

    // This function updates the value of the matrix in accordande to the matrixRange
    this.updateRanges = function () {

      if (!isNaN(this.matrixDimension)) {
        for (var i = 0; i < this.matrixDimension; i++) {
          for (var j = 0; j < this.matrixDimension; j++) {
            
            // If a valid change
            if (!isNaN(this.matrixRange)) {
              if (parseInt(this.matrixDataA[i][j])>this.matrixRange) {
                  this.matrixDataA[i][j] = '' + this.matrixRange;          
              }
              if (parseInt(this.matrixDataB[i][j])>this.matrixRange) {
                  this.matrixDataB[i][j] = '' + this.matrixRange;          
              }
            } else { // An invalid change

                this.matrixDataA[i][j] = "0";          
                this.matrixDataB[i][j] = "0";          
            }
          }
        }
      } 
    };

    /* PopUp  http://stackoverflow.com/questions/21519113/angularjs-open-a-new-browser-window-yet-still-retain-scope-and-controller-and 
              http://stackoverflow.com/questions/23995765/using-window-opener-for-a-function-in-angularjs */

      this.popUp = function () {
          var popupWindow = window.open('view/popup/popUpWindow.html');
          popupWindow.matrixDataA = this.matrixDataA;
          popupWindow.matrixDataB = this.matrixDataB;
          popupWindow.matrixDataC = this.matrixDataC;
          popupWindow.matrixDimension = this.matrixDimension;
          popupWindow.action = $scope.action;
      }

     this.calculate = function () {
       // !isNaN(this.matrixRange) <-- The range is atleast 0
        if (!isNaN(this.matrixDimension)) {
          // A + B  = C
          if ($scope.action == "add") {
            this.calculateAdd();
          } 
          // A - B  = C
          if ($scope.action == "substract") {
            this.calculateSubstract();
          } 
          // A * B  = C
          if ($scope.action == "multiply") {
            this.calculateMultiply();
          }
          this.popUp();
        }
     }

     this.calculateAdd = function () {
        for (var i = 0; i < this.matrixDimension; i++) {
          for (var j = 0; j < this.matrixDimension; j++) {
            // http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript
            this.matrixDataC[i][j] = '' + (parseInt(this.matrixDataA[i][j]) + parseInt(this.matrixDataB[i][j]));
          }
        }
        // console.log(this.matrixDataC);
     };

     this.calculateSubstract = function () {
        for (var i = 0; i < this.matrixDimension; i++) {
          for (var j = 0; j < this.matrixDimension; j++) {
            // http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript
            this.matrixDataC[i][j] = '' + (parseInt(this.matrixDataA[i][j]) - parseInt(this.matrixDataB[i][j]));
          }
        }   
        // console.log(this.matrixDataC);
     };

     this.calculateMultiply = function () {
        for (var i = 0; i < this.matrixDimension; i++) {
          for (var j = 0; j < this.matrixDimension; j++) {
            this.matrixDataC[i][j]=0;
            for (var k = 0; k < this.matrixDimension; k++) {
              this.matrixDataC[i][j] += parseInt(this.matrixDataA[i][k]) * parseInt(this.matrixDataB[k][j]);
            }
            // http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript
            this.matrixDataC[i][j] = '' + this.matrixDataC[i][j];
          }
        }
        // console.log(this.matrixDataC); 
     };

     this.initializeFields();
    
  });

  /*
    The restrict option is typically set to:

    'A' - only matches attribute name
    'E' - only matches element name
    'C' - only matches class name
    'M' - only matches comment
  */

  app.directive("operationViewForm", function () {
    return {
      restrict: 'E', // type of directive
      templateUrl:"view/templates/operation-view-form.html",
      controller: function() {
        // When the document is ready execute this code
      },
      controllerAs: 'operationViewFormCtrl' // This is the alias
    };
  });

  app.directive("matrixViewForm", function () {
    return {
      restrict: 'E', // type of directive
      templateUrl:"view/templates/matrix-view-form.html",
      controller: function() {
        // When the document is ready execute this code
      },
      controllerAs: 'matrixViewFormCtrl' // This is the alias
    };
  });

})();
