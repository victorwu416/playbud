angular
  .module('Playbud')
  .controller('SkillCtrl', SkillCtrl);

function SkillCtrl ($reactive, $scope, $stateParams, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    skill() {
      // return SkillsTransform.skillWithAnswers(Skills, $stateParams.skillId, SkillAnswers);
      return SkillsTransform.skillWithState(Skills, $stateParams.skillId, SkillAnswers);
    },
    selectedAnswerOptionValue() {
      return _instance.selectedAnswerOptionValue;
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
  }, {
    value: 'did-not-try',
    text: 'Did not try'
  }];

  _instance.submitAnswer = function() {
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
  };

}
