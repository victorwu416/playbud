angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl($scope, $reactive) {
  var _instance = this;
  $reactive(_instance).attach($scope);

  _instance.helpers({
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

  SkillAnswers = new Meteor.Collection("skillAnswers");

  _instance.start = start;
  _instance.submitAnswer = submitAnswer;
  _instance.done = done;

  _instance.evaluationSkills = [];
  _instance.evaluationSkillsCopy = [];
  _instance.currentQuestion = null;
  _instance.section = 'start';

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

  // Controller functions
  function start() {
    _instance.subscribe('skills', () => ['next', []], function() {
      angular.copy(Skills.find({}).fetch(), _instance.evaluationSkills);
      angular.copy(_instance.evaluationSkills, _instance.evaluationSkillsCopy);
      nextQuestion();
    });
  }

  function submitAnswer() {
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

  function done() {
    _instance.section = 'start';
  }

  // Private functions
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
    _instance.subscribe('skills', () => ['specific', _instance.evaluationSkillsCopy], function() {
      _instance.resultsSkills = Skills.find({}).fetch();
      console.log(SkillAnswers.find().fetch());
    });
    _instance.section = 'results';
  }
}
