angular
  .module('Playbud')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  this.Login = Login;
  $scope.loginFailedMsg = "";

  function Login() {
    Meteor.loginWithPassword(this.email, this.password, function(error) {
      if(error){
        $scope.$apply(function () {
          $scope.loginFailedMsg = "The email and password you entered don't match.";
        });
      }
      else {
        // Make sure the profile is completed
        Meteor.call('isUserProfileCompleted', function(data) {
          if(data){
            $state.go("tab.progress");
          }
          else {
            $state.go("tab.account");
          }
        });


      }
    });

  };

}
