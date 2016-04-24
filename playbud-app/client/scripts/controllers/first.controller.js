angular
  .module('Playbud')
  .controller('FirstCtrl', FirstCtrl);

function FirstCtrl($reactive, $scope, $state) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    creatingEphemeralAccount() {
      return _instance.creatingEphemeralAccount;
    },
  });

  _instance.creatingEphemeralAccount = false;

  _instance.createEphemeralAccount = function () {
    _instance.creatingEphemeralAccount = true;
    Meteor.call(
      'createPlaybudAccount',
      'playbud' + Math.random() + '@playbud.me',
      Math.random() + '',
      'Your Child',
      moment().subtract(3, 'months').toDate(),
      function(error, ephemeralUserId) {
        if (error) {
          throw new Meteor.Error('method-call-createPlaybudAccount', 'Error creating ephemeral account');
        } else {
          Session.set('ephemeralUserId', ephemeralUserId);
          $state.go('tab.play');
          _instance.creatingEphemeralAccount = false;
        }
      }
    );
  }
}
