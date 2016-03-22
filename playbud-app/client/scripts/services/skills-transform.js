angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  // _instance.appropriateSkills = function (skillsCollection, skillAnswersCollection) {
  //   var appropriateSkills = _.filter(skillsCollection.find({}).fetch(), function (skill) {
  //     return skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2;
  //   });
  //   return appropriateSkills;
  // };
  //
  // _instance.skillsWithStates = function (skillsCollection, skillAnswersCollection) {
  //   var skillsWithStates = _.map(skillsCollection.find({}).fetch(), function (skill) {
  //     if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
  //       skill.state = 'passed';
  //     } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() === 1) {
  //       skill.state = 'getting-there';
  //     } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'with-difficulty'}).count() >= 1) {
  //       skill.state = 'getting-there';
  //     } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'unable'}).count() >= 1) {
  //       skill.state = 'tried';
  //     } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'did-not-try'}).count() >= 1) {
  //       skill.state = 'not-started';
  //     } else {
  //       skill.state = 'not-started';
  //     }
  //     return skill;
  //   });
  //   return skillsWithStates;
  // };

  _instance.nextSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: 1, shortDescription: 1},
    };
    var nextSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2) {
        return _skillWithState(skill, skillAnswersCollection);
      }
    });
    if (nextSkills.length > 3) {
      nextSkills = nextSkills.slice(0, 3);
    }
    return nextSkills;
  }

  _instance.previousSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: -1, shortDescription: 1},
    };
    var previousSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
        return _skillWithState(skill, skillAnswersCollection);
      }
    });
    return previousSkills;
  }

  // _instance.skillWithAnswers = function (skillsCollection, skillId, skillAnswersCollection) {
  //   var skill = skillsCollection.findOne(new Meteor.Collection.ObjectID(skillId));
  //   skill.answers = skillAnswersCollection.find({skillId: skillId}).fetch();
  //   return skill;
  // }

  _instance.skillWithState = function (skillsCollection, skillId, skillAnswersCollection) {
    return _skillWithState(skillsCollection.findOne(new Meteor.Collection.ObjectID(skillId)), skillAnswersCollection);
  }

  function _skillWithState (skill, skillAnswersCollection) {
    if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
      skill.state = 'passed';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() === 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'with-difficulty'}).count() >= 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'unable'}).count() >= 1) {
      skill.state = 'tried';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'did-not-try'}).count() >= 1) {
      skill.state = 'not-started';
    } else {
      skill.state = 'not-started';
    }
    return skill;
  }
}
