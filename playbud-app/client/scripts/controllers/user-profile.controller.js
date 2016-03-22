angular
  .module('Playbud')
  .controller('UserProfileCtrl', UserProfileCtrl);

function UserProfileCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  this.childFirstName = Meteor.user().profile.child.firstName;
  this.childLastName = Meteor.user().profile.child.lastName;
  this.childAge = Meteor.user().profile.child.age;

  //this.helpers({
  //  childLastName: function() { return Meteor.user().profile.child.lastname; },
  //  childAge: function() { return Meteor.user().profile.child.age; },
  //  childGender: function() { return Meteor.user().profile.child.gender; }
//  });

  this.Update = Update;
  function Update() {
    console.log(this.childFirstName);
    // create user account
    Meteor.call('updateUserProfile',
                this.childFirstName,
                this.childLastName,
                this.childAge,
                'boy');

    // login and redirect to user profile


  };
}
