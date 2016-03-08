angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.subscribe('nextSkills');
  this.helpers({
    nextSkills() {
      return Skills.find({});
    },
    updatedSkills() {
      return Session.get('updatedSkills');
    }
  });

  this.toggleSection = toggleSection;
  this.start = start;
  this.nextQuestion = nextQuestion;
  this.done = done;

  this.toggleSection('start');

  function toggleSection (section) {
    this.showStart = false;
    this.showQuestion = false
    this.showResults = false;
    switch (section) {
      case 'start': this.showStart = true; break;
      case 'question': this.showQuestion = true; break;
      case 'results': this.showResults = true; break;
      default: break;
    }
  }

  function start () {
    this.evaluationSkills = [];
    angular.copy(this.nextSkills, this.evaluationSkills);
    this.currentQuestionIndex = -1;
    this.nextQuestion();
  }

  function nextQuestion () {
    this.toggleSection('question');
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.evaluationSkills.length) {
      Session.set('updatedSkills', []);
      this.toggleSection('results');
      results(this.evaluationSkills);
    }
  }

  function done () {
    this.toggleSection('start');
  }

  function results (evaluationSkills) {
    Meteor.call('getUpdatedSkills', evaluationSkills, function (error, result) {
      if (error) {
        throw new Meteor.Error('method-call-getUpdatedSkills', 'Error getting updated skills');
      } else {
        Session.set('updatedSkills', result);
      }
    });
  }

}
