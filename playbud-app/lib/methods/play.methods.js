Meteor.methods({
  submitAnswer (skill, value) {
    check(skill, Object);
    check(skill._id.valueOf(), String);
    check(value, String);
    if (!Meteor.user()) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to submit answer');
    }
    return Answers.insert({skillId: skill._id.valueOf(), userId: this.userId, value: value});
  }
});
