angular
  .module('Playbud')
  .controller('PlayIdeaCtrl', PlayIdeaCtrl);

function PlayIdeaCtrl ($reactive, $scope, $stateParams) {
  $reactive(this).attach($scope);

  var skillId = $stateParams.skillId;

  this.subscribe('nextSkills');
  this.helpers({
    skill() {
      return Skills.findOne(skillId);
    }
  });
}
