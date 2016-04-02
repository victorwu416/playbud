angular
  .module('Playbud')
  .controller('PlaybudAccountCtrl', PlaybudAccountCtrl);

function PlaybudAccountCtrl($reactive, $scope, $stateParams) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  console.log('plabyudaccount');
  console.log(Meteor.user());

  _instance.helpers({
    user() {
      return Meteor.user();
    },
    email() {
      return Meteor.user() ? Meteor.user().emails[0].address : '';
    },
    childName() {
      return Meteor.user() ? Meteor.user().profile.childName : '';
    },
    childMonths() {
      return Meteor.user() ? moment().diff(Meteor.user().profile.childBirthdate, 'months') : -1;
    },
    haveToy() {
      return _instance.haveToy;
    },
    loggedOutSection() {
      return _instance.loggedOutSection;
    },
    showSignUpValidationMessage() {
      return _instance.showSignUpValidationMessage;
    },
    signUpValidationMessage() {
      return _instance.signUpValidationMessage;
    },
    showLogInValidationMessage() {
      return _instance.showLogInValidationMessage;
    }
  });

  _instance.haveToy = Meteor.user() ? Meteor.user().profile.haveToy : false;
  _instance.loggedOutSection = $stateParams.loggedOutSection;
  _instance.showSignUpValidationMessage = false;
  _instance.showLogInValidationMessage = false;

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

  _instance.logIn = function () {
    if (!_instance.email && !_instance.password) {
      _instance.showLogInValidationMessage = true;
      return;
    }
    Meteor.loginWithPassword(_instance.email, _instance.password, function (error) {
      if (error) {
        _instance.showLogInValidationMessage = true;
      }
    });
  }

  _instance.logOut = function () {
    Meteor.logout(function (error) {
      if (error) {
        throw new Meteor.Error('meteor-logout', 'Error logging out');
      } else {
        _instance.loggedOutSection = 'signUpLogIn';
        _instance.email = _instance.password = _instance.childName = _instance.childBirthdate = null;
      }
    });
  };

  _instance.cancel = function () {
    _instance.showSignUpValidationMessage = _instance.showLogInValidationMessage = false;
    _instance.loggedOutSection='signUpLogIn';
    _instance.password = null;
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

  function clientValidateSignUp() {
    _instance.signUpValidationMessage = '';
    if (!_instance.email) {
      _instance.signUpValidationMessage = 'Enter valid email';
    } else if (!_instance.password) {
      _instance.signUpValidationMessage = 'Enter password';
    } else if (!_instance.childName) {
      _instance.signUpValidationMessage = 'Enter child\'s name';
    } else if (!_instance.childBirthdate) {
      _instance.signUpValidationMessage = 'Enter valid child\'s birthdate';
    } else if (!validateBirthDate()) {
      _instance.signUpValidationMessage = 'Playbud only works with children 3 to 18 months';
    }
    if (_instance.signUpValidationMessage) {
      _instance.showSignUpValidationMessage = true;
      return false;
    }
    return true;
  }

  function validateBirthDate() {
    var childMonths = moment().diff(_instance.childBirthdate, 'months');
    return (childMonths >=3) && (childMonths <= 18) ? true : false;
  }
}
