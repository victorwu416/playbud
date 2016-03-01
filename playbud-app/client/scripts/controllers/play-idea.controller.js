angular
  .module('Playbud')
  .controller('PlayIdeaCtrl', PlayIdeaCtrl);

function PlayIdeaCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello play idea';

  console.log('PlayIdeaCtrl');
}
