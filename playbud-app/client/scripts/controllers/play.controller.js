angular
  .module('Playbud')
  .controller('PlayCtrl', PlayCtrl);

function PlayCtrl($reactive, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    skills() {
      return _instance.skills;
    },
    moreSkillsAvailable() {
      return _instance.moreSkillsAvailable;
    }
  });

  _instance.skills = [];
  _instance.moreSkillsAvailable = true;
  _instance.lastSkillId = '';
  _instance.skillsCountLimit = 10;

  _instance.subscribe('skills', () => [_instance.skillsCountLimit], function() {
    _instance.skills = Skills.find({}).fetch();
  });

  _instance.getMoreSkills = function() {
    _instance.skillsCountLimit += 5;
    _instance.subscribe('skills', () => [_instance.skillsCountLimit], function() {
      _instance.skills = Skills.find({}).fetch();
      $scope.$broadcast('scroll.infiniteScrollComplete');
      var lastSkillId = _instance.skills[_instance.skills.length-1]._id.valueOf();
      if (_instance.lastSkillId === lastSkillId) {
        _instance.moreSkillsAvailable = false;
      } else {
        _instance.lastSkillId = lastSkillId;
      }
    });
  };
}
