angular
  .module('Playbud')
  .controller('PlayCtrl', PlayCtrl);

function PlayCtrl($reactive, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    user() {
      return Meteor.user();
    },
    childName() {
      if (!Meteor.user()) {
        return 'Your Child';
      } else {
        return Meteor.user().profile.childName;
      }
    },
    atChildMonthsMonths() {
      if (!Meteor.user()) {
        return '';
      } else {
        return 'at ' + moment().diff(Meteor.user().profile.childBirthdate, 'months') + ' months';
      }
    },
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

  _instance.subscribe('skills', () => [Session.get('ephemeralUserId')]);

  _instance.getMoreSkills = function() {
    _instance.subscribe('skills', () => [Session.get('ephemeralUserId')], function() {
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
