angular
  .module('Playbud')
  .controller('TabsCtrl', TabsCtrl);

function TabsCtrl($reactive, $scope) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    childName() {
      return Meteor.user() ? Meteor.user().profile.childName : 'Your Child';
    }
  });
}
