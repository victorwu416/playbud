Meteor.methods({
  submitAnswer (skill, value, ephemeralUserId) {
    check(skill, Object);
    check(skill._id.valueOf(), String);
    check(value, String);
    check(ephemeralUserId, String);
    var userId = this.userId ? this.userId : ephemeralUserId;
    return Answers.insert({skillId: skill._id.valueOf(), userId: userId, value: value});
  }
});
