angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  console.log('evaluate control');

  this.subscribe('nextSkills');
  this.helpers({
    nextSkills() {
      return Skills.find({});
    }
  });

  this.showStart = true;
  this.showQuestion = false;

  this.startEvaluation = startEvaluation;
  this.nextQuestion = nextQuestion;

  function startEvaluation () {
    this.evaluationSkills = [];
    angular.copy(this.nextSkills, this.evaluationSkills);
    this.currentQuestionIndex = -1;
    this.showStart = false;

    console.log(this.evaluationSkills);

    this.nextQuestion();
  }

  function nextQuestion() {
    this.showQuestion = true;
    this.currentQuestionIndex++;
  }



}
