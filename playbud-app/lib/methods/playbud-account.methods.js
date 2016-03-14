Meteor.methods({
  updateParent (parent) {
    if (parent.childDateOfBirth) {
      check(parent, {childFirstName: String, childDateOfBirth: Date});
    } else {
      check(parent, {childFirstName: String, childDateOfBirth: String});
    }
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to update parent');
    }
    return Parents.upsert(
      {userId: this.userId},
        {
          $set: {
            userId: this.userId,
            childFirstName: parent.childFirstName,
            childDateOfBirth: parent.childDateOfBirth
          }
        }
      );
  }
});  
