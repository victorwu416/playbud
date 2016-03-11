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
  },

  submitAnswer (skill, answer) {
    check(skill, Object);
    check(skill._id.valueOf(), String);
    check(answer, String);
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to insert answer option value');
    }
    return Answers.insert({skillId: skill._id.valueOf(), userId: this.userId, answer: answer});
  },

  getUpdatedSkills (skills) {
    check(skills, Array);
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to get updated skills');
    }
    var skillIds = _.map(skills, function(skill) {
      return skill._id;
    });
    return Skills.find({_id: { $in: skillIds}}, {reactive: false}).fetch();
  }
});
