angular
  .module('Playbud', [
    'accounts.ui',
    'angular-meteor',
    'angularMoment',
    'ionic'
  ]);

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['Playbud']);
}
