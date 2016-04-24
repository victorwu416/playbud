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
    childMonths() {
      return Meteor.user() ? moment().diff(Meteor.user().profile.childBirthdate, 'months') : -1;
    },
    haveToy() {
      return Meteor.user() ? Meteor.user().profile.haveToy : false;
    },
    loggedOutSection() {
      return _instance.loggedOutSection;
    },
    signUpValidationMessage() {
      return _instance.signUpValidationMessage;
    },
    logInValidationMessage() {
      return _instance.logInValidationMessage;
    },
    loggingIn() {
      return _instance.loggingIn;
    },
    loggingOut() {
      return _instance.loggingOut;
    },
    signingUp() {
      return _instance.signingUp;
    }
  });

  _instance.loggedOutSection = $stateParams.loggedOutSection;
  _instance.logInValidationMessage = _instance.signUpValidationMessage = '';
  _instance.loggingIn = _instance.loggingOut = _instance.signingUp = false;

  _instance.createPlaybudAccountAndLogIn = function () {
    if (!_clientValidateSignUp()) {
      return;
    }
    _instance.signingUp = true;
    Meteor.call(
      'createPlaybudAccount',
      _instance.email,
      _instance.password,
      _instance.childName,
      _instance.childBirthdate,
      function(error, result) {
        _instance.signingUp = false;
        if (error) {
          _instance.signUpValidationMessage = 'Email already exists. Cancel and log in';
        } else {
          _instance.logIn();
        }
      }
    );
  };

  _instance.logIn = function () {
    if (!_instance.email && !_instance.password) {
      _instance.logInValidationMessage = 'Invalid email and/or password';
      return;
    }
    _instance.loggingIn = true;
    Meteor.loginWithPassword(_instance.email, _instance.password, function (error) {
      _instance.loggingIn = false;
      if (error) {
        _instance.logInValidationMessage = 'Invalid email and/or password';
      } else {
        _instance.logInValidationMessage = _instance.signUpValidationMessage = '';
        _instance.email = _instance.password = _instance.childName = _instance.childBirthdate = null;
      }
    });
  }

  _instance.logOut = function () {
    _instance.loggingOut = true;
    Meteor.logout(function (error) {
      _instance.loggingOut = false;
      if (error) {
        throw new Meteor.Error('meteor-logout', 'Error logging out');
      } else {
        _instance.logInValidationMessage = _instance.signUpValidationMessage = '';
        _instance.email = _instance.password = _instance.childName = _instance.childBirthdate = null;
        _instance.loggedOutSection = 'signUpLogIn';
      }
    });
  };

  _instance.cancel = function () {
    _instance.logInValidationMessage = _instance.signUpValidationMessage = '';
    _instance.email = _instance.password = _instance.childName = _instance.childBirthdate = null;
    _instance.loggedOutSection='signUpLogIn';
  }

  _instance.updateHaveToy = function () {
    Meteor.call(
      'updateHaveToy',
      _instance.haveToy,
      function(error, result) {
        if (error) {
          throw new Meteor.Error('method-call-updateHaveToy', 'Error updating have toy');
        }
      }
    );
  }

  function _clientValidateSignUp() {
    _instance.signUpValidationMessage = '';
    if (!_instance.email) {
      _instance.signUpValidationMessage = 'Enter valid email';
    } else if (!_instance.password) {
      _instance.signUpValidationMessage = 'Enter password';
    } else if (!_instance.childName) {
      _instance.signUpValidationMessage = 'Enter child\'s name';
    } else if (!_instance.childBirthdate) {
      _instance.signUpValidationMessage = 'Enter valid child\'s birthdate';
    } else if (!_validateBirthDate()) {
      _instance.signUpValidationMessage = 'Playbud only works with children 3 to 10 months';
    }
    if (_instance.signUpValidationMessage) {
      return false;
    }
    return true;
  }

  function _validateBirthDate() {
    var childMonths = moment().diff(_instance.childBirthdate, 'months');
    return (childMonths >=3) && (childMonths <= 10) ? true : false;
  }
}
