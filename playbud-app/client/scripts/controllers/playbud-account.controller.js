angular
  .module('Playbud')
  .controller('PlaybudAccountCtrl', PlaybudAccountCtrl);

function PlaybudAccountCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello playbud account';

  console.log('PlaybudAccountCtrl');
}
