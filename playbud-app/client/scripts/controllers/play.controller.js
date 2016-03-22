angular
  .module('Playbud')
  .controller('PlayCtrl', PlayCtrl);

function PlayCtrl($reactive, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    nextSkills() {
      updateSkills();
      return _instance.nextSkills;
    },
    previousSkills() {
      updateSkills();
      return _instance.previousSkills;
    },
    moreSkillsAvailable() {
      return _instance.moreSkillsAvailable;
    }
  });

  _instance.nextSkills = [];
  _instance.previousSkills = [];

  _instance.moreSkillsAvailable = true;
  _instance.lastSkillId = '';
  _instance.bottomMonths = 5;

  _instance.subscribe('skills', () => [_instance.bottomMonths]);

  _instance.getMoreSkills = function() {
    _instance.bottomMonths -= 1;
    _instance.subscribe('skills', () => [_instance.bottomMonths], function() {
      updateSkills();
      updateMoreSkillsAvailable();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  function updateSkills() {
    _instance.nextSkills = SkillsTransform.nextSkills(Skills, SkillAnswers);
    _instance.previousSkills = SkillsTransform.previousSkills(Skills, SkillAnswers);
  }

  function updateMoreSkillsAvailable() {
    if (_instance.previousSkills.length > 0) {
      var lastSkillId = _instance.previousSkills[_instance.previousSkills.length-1]._id.valueOf();
      if (_instance.lastSkillId === lastSkillId) {
        _instance.moreSkillsAvailable = false;
      } else {
        _instance.lastSkillId = lastSkillId;
      }
    } else {
      _instance.moreSkillsAvailable = false;
    }
  }
}
