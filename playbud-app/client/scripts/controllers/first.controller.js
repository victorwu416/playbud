angular
  .module('Playbud')
  .controller('FirstCtrl', FirstCtrl);

function FirstCtrl($reactive, $scope, $state) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.createEphemeralAccount = function () {
    Meteor.call(
      'createPlaybudAccount',
      'playbud' + Math.random() + '@playbud.me',
      Math.random() + '',
      'Your Child',
      moment().subtract(4, 'months').toDate(),
      function(error, ephemeralUserId) {
        if (error) {
          throw new Meteor.Error('method-call-createPlaybudAccount', 'Error creating ephemeral account');
        } else {
          Session.set('ephemeralUserId', ephemeralUserId);
          $state.go('tab.play');
        }
      }
    );
  }
}
