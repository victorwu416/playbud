angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.helpers({
    showStart() { return this.showStart ? this.showStart: false },
    showQuestion() { return this.showQuestion ? this.showQuestion : false; },
    showResults() { return this.showResults ? this.showResults : false; },
    nextButtonDisabled() { return this.nextButtonDisabled ? this.nextButtonDisabled : true; },
    evaluationSkills() { return this.evaluationSkills ? this.evaluationSkills : []; },
    currentQuestionIndex() { return this.currentQuestionIndex ? this.currentQuestionIndex : -1; },
    selectedAnswerOptionValue() { return this.selectedAnswerOptionValue ? this.selectedAnswerOptionValue : ''; },
    skillsWithAnswers() { return this.skillsWithAnswers ? this.skillsWithAnswers : []; },
  });

  this.toggleSection = toggleSection;
  this.start = start;
  this.submitAnswer = submitAnswer;
  this.done = done;

  this.answerOptions = [
    {value: 'easily', text: 'Easily'},
    {value: 'with-difficulty', text: 'With difficulty'},
    {value: 'unable', text: 'Unable'},
    {value: 'did-not-try', text: 'Did not try'}
  ];

  this.toggleSection('start');

  // Controller functions
  function toggleSection (section) {
    this.showStart = this.showQuestion = this.showResults = false;
    switch (section) {
      case 'start': this.showStart = true; break;
      case 'question': this.showQuestion = true; break;
      case 'results': this.showResults = true; break;
      default: break;
    }
  }

  function start () {
    this.subscribe('nextSkills', function () {
      angular.copy(Skills.find({}).fetch(), this.evaluationSkills);
      this.currentQuestionIndex = -1;
      nextQuestion(this);
    });
  }

  function submitAnswer () {
    (function (evaluateCtrl) {
      Meteor.call(
        'submitAnswer',
        evaluateCtrl.evaluationSkills[evaluateCtrl.currentQuestionIndex],
        evaluateCtrl.selectedAnswerOptionValue,
        function (error, result) {
          if (error) {
            throw new Meteor.Error('method-call-submitAnswer', 'Error submitting answer');
          } else {
            nextQuestion(evaluateCtrl);
          }
        });
    })(this);
  }

  function done () {
    this.toggleSection('start');
  }

  // Private functions
  function nextQuestion (evaluateCtrl) {
    evaluateCtrl.nextButtonDisabled = true;
    evaluateCtrl.currentQuestionIndex++;
    if (evaluateCtrl.currentQuestionIndex >= evaluateCtrl.evaluationSkills.length) {
      results(evaluateCtrl);
    } else {
      evaluateCtrl.selectedAnswerOptionValue = '';
      evaluateCtrl.toggleSection('question');
    }
  }

  function results (evaluateCtrl) {
    (function (evaluateCtrl) {
      Meteor.call('skillsWithAnswers', evaluateCtrl.evaluationSkills, function (error, skillsWithAnswers) {
        if (error) {
          throw new Meteor.Error('method-call-skillsWithAnswers', 'Error getting skills with answers');
        } else {
          evaluateCtrl.skillsWithAnswers = skillsWithAnswers;
          evaluateCtrl.toggleSection('results');
        }
      });
    })(evaluateCtrl);
  }
}
