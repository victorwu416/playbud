angular
  .module('Playbud')
  .controller('PlayIdeaCtrl', PlayIdeaCtrl);

function PlayIdeaCtrl ($reactive, $scope, $stateParams) {
  $reactive(this).attach($scope);

  this.subscribe('nextSkills');
  this.helpers({
    skill() {
      return Skills.findOne(new Meteor.Collection.ObjectID($stateParams.skillId));
    }
  });
}
