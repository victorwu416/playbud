angular
  .module('Playbud')
  .controller('PlaybudAccountCtrl', PlaybudAccountCtrl);

function PlaybudAccountCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.subscribe('parent');
  this.helpers({
    parent() {
      var parent = Parents.findOne({userId: Meteor.userId()});
      if (!parent) {
        parent = {
          childFirstName: '',
          childDateOfBirth: ''
        };
      }
      return parent;
    }
  });

  this.updateParent = updateParent;

  function updateParent () {
    var updatedParent = {
      childFirstName: this.parent.childFirstName,
      childDateOfBirth: this.parent.childDateOfBirth
    }
    Meteor.call('updateParent', updatedParent);
  }
}
