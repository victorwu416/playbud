angular
  .module('Playbud')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  this.SignUp = SignUp;
  function SignUp() {

    // create user account
    Meteor.call('createUserAccount', this.email, this.password);

    // login and redirect to user profile
    Meteor.loginWithPassword(this.email, this.password, function(error) {
      $state.go("user-profile");
    });

  };

}
