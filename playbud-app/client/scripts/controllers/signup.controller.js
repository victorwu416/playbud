angular
  .module('Playbud')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  this.SignUp = SignUp;
  function SignUp() {
    Meteor.call('createUserAccount', this.email, this.password);
    Meteor.loginWithPassword(this.email, this.password, function(error) {
      $state.go("user-profile");
    });

  };

}
