angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl($reactive, $scope, SkillsTransform) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
    section() {
      return _instance.section;
    },
    currentQuestion() {
      return _instance.currentQuestion;
    },
    selectedAnswerOptionValue() {
      return _instance.selectedAnswerOptionValue;
    },
    resultsSkills() {
      return _instance.resultsSkills;
    }
  });

  _instance.section = 'start';
  _instance.currentQuestion = null;
  _instance.evaluationSkills = [];
  _instance.evaluationSkillsCopy = [];
  _instance.resultsSkills = [];

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

  _instance.start = function() {
    if (_instance.skillsSubscriptionHandle) {
      _instance.skillsSubscriptionHandle.stop();
    }
    _instance.skillsSubscriptionHandle = _instance.subscribe('skills', () => ['next', []], function () {
      angular.copy(SkillsTransform.appropriateSkills(Skills, SkillAnswers), _instance.evaluationSkills);
      angular.copy(_instance.evaluationSkills, _instance.evaluationSkillsCopy);
      nextQuestion();
    });
  }

  _instance.submitAnswer = function() {
    Meteor.call(
      'submitAnswer',
      _instance.currentQuestion,
      _instance.selectedAnswerOptionValue,
      function(error, result) {
        if (error) {
          throw new Meteor.Error('method-call-submitAnswer', 'Error submitting answer');
        } else {
          nextQuestion();
        }
      }
    );
  }

  function nextQuestion() {
    _instance.nextButtonDisabled = true;
    _instance.currentQuestion = _instance.evaluationSkills.shift();
    if (_instance.currentQuestion) {
      _instance.selectedAnswerOptionValue = '';
      _instance.section = 'question';
    } else {
      results();
    }
  }

  function results() {
    _instance.skillsSubscriptionHandle.stop();
    _instance.skillsSubscriptionHandle = _instance.subscribe('skills', () => ['specific', _instance.evaluationSkillsCopy], function () {
      _instance.resultsSkills = Skills.find({}).fetch()
      _instance.section = 'results';
    });
  }
}
