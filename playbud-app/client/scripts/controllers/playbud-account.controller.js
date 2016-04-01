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
    },
    showSignUpValidationMessage() {
      return _instance.showSignUpValidationMessage;
    },
    signUpValidationMessage() {
      return _instance.signUpValidationMessage;
    }
  });

  _instance.loggedOutSection = $stateParams.loggedOutSection;
  _instance.showSignUpValidationMessage = false;

  _instance.createPlaybudAccountAndLogIn = function () {
    if (!clientValidateSignUp()) {
      return;
    }
    Meteor.call(
      'createPlaybudAccount',
      _instance.email,
      _instance.password,
      _instance.childName,
      _instance.childBirthdate,
      function(error, result) {
        if (error) {
          _instance.signUpValidationMessage = 'Email already exists. Cancel and log in';
          _instance.showSignUpValidationMessage = true;
        } else {
          _instance.showSignUpValidationMessage = false;
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

  _instance.cancel = function () {
    _instance.showSignUpValidationMessage = true;
    _instance.loggedOutSection='signUpLogIn';
  }

  function clientValidateSignUp () {
    _instance.signUpValidationMessage = '';
    if (!_instance.email) {
      _instance.signUpValidationMessage = 'Enter valid email';
    } else if (!_instance.password) {
      _instance.signUpValidationMessage = 'Enter password';
    } else if (!_instance.childName) {
      _instance.signUpValidationMessage = 'Enter child\'s name';
    } else if (!_instance.childBirthdate) {
      _instance.signUpValidationMessage = 'Enter valid child\'s birthdate';
    }
    if (_instance.signUpValidationMessage) {
      _instance.showSignUpValidationMessage = true;
      return false;
    }
    return true;
  }
}
