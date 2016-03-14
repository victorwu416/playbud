angular
  .module('Playbud')
  .controller('PlayIdeasCtrl', PlayIdeasCtrl);

function PlayIdeasCtrl($reactive, $scope) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  this.subscribe('nextSkills');
  this.helpers({
    nextSkills() {
      return Skills.find({});
    }
  });
}
