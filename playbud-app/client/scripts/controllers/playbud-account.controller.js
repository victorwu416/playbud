angular
  .module('Playbud')
  .controller('PlaybudAccountCtrl', PlaybudAccountCtrl);

function PlaybudAccountCtrl($reactive, $scope, $stateParams) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    user() {
      return Meteor.user();
    },
    loggedOutSection() {
      return _instance.loggedOutSection;
    }
  });

  _instance.loggedOutSection = $stateParams.loggedOutSection

  _instance.createPlaybudAccountAndLogIn = function () {
    Meteor.call(
      'createPlaybudAccount',
      _instance.email,
      _instance.password,
      _instance.childName,
      _instance.childBirthdate,
      function(error) {
        if (error) {
          throw new Meteor.Error('method-call-createPlaybudAccount', 'Error creating Playbud account');
        } else {
          _instance.logIn();
        }
      }
    );
  };

  _instance.logOut = function () {
    Meteor.logout(function (error) {
      if (error) {
        throw new Meteor.Error('meteor-logout', 'Error logging out');
      } else {
        _instance.loggedOutSection = 'signUpLogIn';
      }
    });
  };

  _instance.logIn = function () {
    Meteor.loginWithPassword(_instance.email, _instance.password, function (error) {
      if (error) {
        throw new Meteor.Error('meteor-loginWithPassword', 'Error logging in with password');
      }
    });
  }
}
