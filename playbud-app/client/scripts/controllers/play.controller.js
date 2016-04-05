angular
  .module('Playbud')
  .controller('PlayCtrl', PlayCtrl);

function PlayCtrl($location, $reactive, $rootScope, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    user() {
      return Meteor.user();
    },
    childName() {
      return Meteor.user() ? Meteor.user().profile.childName : 'Your Child';
    },
    childMonths() {
      return Meteor.user() ? moment().diff(Meteor.user().profile.childBirthdate, 'months') + '' : '';
    },
    nextSkills() {
      _updateSkills();
      return _instance.nextSkills;
    },
    doneSkills() {
      _updateSkills();
      return _instance.doneSkills;
    },
    moreSkillsAvailable() {
      return _instance.moreSkillsAvailable;
    },
    skillsLoading() {
      return _instance.skillsLoading;
    }
  });

  _instance.nextSkills = [];
  _instance.doneSkills = [];

  _instance.moreSkillsAvailable = true;
  _instance.lastSkillId = '';

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    _instance.skillsLoading = true;
    _instance.subscribe('skills', () => [Session.get('ephemeralUserId')], function () {
      _instance.skillsLoading = false;
    });
  });

  _instance.getMoreSkills = function() {
    _instance.subscribe('skills', () => [Session.get('ephemeralUserId')], function () {
      _updateSkills();
      _updateMoreSkillsAvailable();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  function _updateSkills() {
    _instance.nextSkills = SkillsTransform.nextSkills(Skills, SkillAnswers);
    _instance.doneSkills = SkillsTransform.doneSkills(Skills, SkillAnswers);
  }

  function _updateMoreSkillsAvailable() {
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
