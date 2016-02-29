angular
  .module('Playbud')
  .controller('PlayIdeasCtrl', PlayIdeasCtrl);

function PlayIdeasCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello play ideas';

  console.log('PlayIdeasCtrl');
}
