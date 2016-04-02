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
    doneSkills() {
      updateSkills();
      return _instance.doneSkills;
    },
    moreSkillsAvailable() {
      return _instance.moreSkillsAvailable;
    }
  });

  _instance.nextSkills = [];
  _instance.doneSkills = [];

  _instance.moreSkillsAvailable = true;
  _instance.lastSkillId = '';
  _instance.bottomMonths = 1;

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
    _instance.doneSkills = SkillsTransform.doneSkills(Skills, SkillAnswers);
  }

  function updateMoreSkillsAvailable() {
    if (_instance.doneSkills.length > 0) {
      var lastSkillId = _instance.doneSkills[_instance.doneSkills.length-1]._id.valueOf();
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
