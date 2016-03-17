angular
  .module('Playbud')
  .controller('PlayIdeaCtrl', PlayIdeaCtrl);

function PlayIdeaCtrl ($reactive, $scope, $stateParams) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    skill() {
      return Skills.findOne(new Meteor.Collection.ObjectID($stateParams.skillId));
    }
  });

  _instance.subscribe('skills', () => ['next', []]);

}
