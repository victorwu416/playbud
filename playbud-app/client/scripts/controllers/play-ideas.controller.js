angular
  .module('Playbud')
  .controller('PlayIdeasCtrl', PlayIdeasCtrl);

function PlayIdeasCtrl ($reactive, $scope) {
  $reactive(this).attach($scope);

  this.subscribe('appropriateSkills');
  this.helpers({
    skills() {
      return Skills.find({});
    }
  });
}
