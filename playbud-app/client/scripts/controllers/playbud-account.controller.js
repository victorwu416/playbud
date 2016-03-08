angular
  .module('Playbud')
  .controller('PlaybudAccountCtrl', PlaybudAccountCtrl);

function PlaybudAccountCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.subscribe('currentUser');

  this.updateChildFirstName = updateChildFirstName;
  this.updateChildDateOfBirth = updateChildDateOfBirth;

  function updateChildFirstName () {
    Meteor.call('updateChildFirstName', this.parent.childFirstName);
  }

  function updateChildDateOfBirth () {
    Meteor.call('updateChildDateOfBirth', this.parent.childDateOfBirth);
  }
}
