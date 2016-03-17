angular
  .module('Playbud')
  .controller('PlayIdeasCtrl', PlayIdeasCtrl);

function PlayIdeasCtrl($reactive, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    skills() {
      return _instance.skills;
    }
  });

  _instance.skills = [];

  _instance.subscribe('skills', () => ['next', []], function() {
    angular.copy(SkillsTransform.appropriateSkills(Skills, SkillAnswers), _instance.skills);
  });
}
