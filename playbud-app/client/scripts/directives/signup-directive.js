angular
  .module('Playbud')
  .directive('emailAvailable', function ($q){
     return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {

          ctrl.$asyncValidators.emailAvailable = function(modelValue, viewValue) {

            var defer = $q.defer();
            var email = modelValue || viewValue;

            Meteor.call('isEmailFound', email, function(err, data) {
              if(data) {
                defer.reject();
              }
              else {
                defer.resolve();
              }

            });


            return defer.promise;
          };
        }
     };
  })

  .directive('passwordStrength', function (){
     return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {

          var validator = function(value) {
            var validateLength = (value && value.length >= 8) ? true : false;
            var hasUpper = (value && /[A-Z]/.test(value)) ? true : false;
            var hasLower = (value && /[a-z]/.test(value)) ? true : false;
    				var hasNumber = (value && /\d/.test(value)) ? true : false;
            var noAlphabet = (value && /\W/.test(value)) ? true : false;

            ctrl.$setValidity('passwordStrength',
              validateLength); //  && hasUpper && hasLower && hasNumber && noAlphabet
            return value;
         };

        ctrl.$parsers.unshift(validator);
        ctrl.$formatters.unshift(validator);
        }
     };
  });
