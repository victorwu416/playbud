angular
  .module('Playbud')
  .directive('emailAvailable', function ($q){
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl) {

        ctrl.$asyncValidators.emailAvailable = function(modelValue, viewValue) {

          var defer = $q.defer();
          var email = modelValue || viewValue;

          Meteor.call('isEmailFound', email, function(err, data) {
            //ctrl.$setValidity('emailAvailable',found);
            defer.resolve();
          });


          return defer.promise;
      };

          //ctrl.$parsers.push(validate);

      }
   };
});
