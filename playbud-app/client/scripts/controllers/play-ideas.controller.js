angular
  .module('Playbud')
  .controller('PlayIdeasCtrl', PlayIdeasCtrl);

function PlayIdeasCtrl ($reactive, $scope) {
  $reactive(this).attach($scope);

  this.subscribe('nextSkills');
  this.helpers({
    nextSkills() {
      return Skills.find({});
    }
  });
}
