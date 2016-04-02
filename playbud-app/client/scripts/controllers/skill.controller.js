angular
  .module('Playbud')
  .controller('SkillCtrl', SkillCtrl);

function SkillCtrl($reactive, $scope, $stateParams, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    section() {
      return _instance.section;
    },
    skill() {
      return SkillsTransform.skillWithState(Skills, $stateParams.skillId, SkillAnswers);
    },
    selectedAnswerOptionValue() {
      return _instance.selectedAnswerOptionValue;
    },
    childName() {
      return Meteor.user() ? Meteor.user().profile.childName : 'Your Child';
    }
  });

  _instance.answerOptions = [{
    value: 'easily',
    text: 'Easily'
  }, {
    value: 'with-difficulty',
    text: 'With difficulty'
  }, {
    value: 'unable',
    text: 'Unable'
  }];

  _instance.section = 'skill';
  _instance.selectedAnswerOptionValue = '';

  _instance.submitAnswer = function () {
    Meteor.call(
      'submitAnswer',
      _instance.skill,
      _instance.selectedAnswerOptionValue,
      function(error, result) {
        if (error) {
          throw new Meteor.Error('method-call-submitAnswer', 'Error submitting answer');
        }
      }
    );
    _instance.section = 'evaluate-finish';
  };

  _instance.skipSkill = function () {
    Meteor.call(
      'submitAnswer',
      _instance.skill,
      'skip',
      function(error, result) {
        if (error) {
          throw new Meteor.Error('method-call-submitAnswer', 'Error submitting answer, skip');
        }
      }
    );
    _instance.section = 'skip-finish';
  };

}
