angular
  .module('Playbud')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  this.Login = Login;
  $scope.loginFailedMsg = "";
  Meteor.logout();  // Todo: remove this line

  function Login() {
    Meteor.loginWithPassword(this.email, this.password, function(error) {
      if(error){
        $scope.$apply(function () {
          $scope.loginFailedMsg = "The email and password you entered don't match.";
        });
      }
      else {
        Meteor.call('isUserProfileCompleted', function(data) {
          if(data){
            $state.go("tab.progress");
          }
          else {
            $state.go("user-profile");
          }
        });


      }
    });

  };

}
