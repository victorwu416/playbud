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

  this.showStart = true;
  this.showQuestion = false;
  this.showResults = false;

  this.start = function () {
    this.evaluationSkills = [];
    angular.copy(this.nextSkills, this.evaluationSkills);
    this.currentQuestionIndex = -1;
    this.nextQuestion();
  }

  this.nextQuestion = function () {
    this.showStart = false;
    this.showQuestion = true;
    this.showResults = false;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.evaluationSkills.length) {
      Session.set('updatedSkills', []);
      this.showStart = false;
      this.showQuestion = false;
      this.showResults = true;
      results(this.evaluationSkills);
    }
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
