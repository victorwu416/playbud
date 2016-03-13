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

  submitAnswer (skill, value) {
    check(skill, Object);
    check(skill._id.valueOf(), String);
    check(value, String);
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to submit answer value');
    }
    return Answers.insert({skillId: skill._id.valueOf(), userId: this.userId, value: value});
  },

  skillsWithAnswers (skills) {
    check(skills, Array);
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to get skills with answers');
    }
    var skillIds = _.map(skills, function (skill) {
      return skill._id;
    });
    var skillsWithAnswers = Skills.find({_id: { $in: skillIds}}, {reactive: false}).fetch();
    var userId = this.userId;
    _.each(skillsWithAnswers, function (skill) {
      skill.answers = Answers.find({skillId: skill._id.valueOf(), userId: userId}, {reactive: false}).fetch();
    });
    return skillsWithAnswers;
  }
});
