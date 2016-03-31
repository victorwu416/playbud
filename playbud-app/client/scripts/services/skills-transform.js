angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  _instance.nextSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: 1, shortDescription: 1},
    };
    var nextSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2) &&
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() < 1)
      ) {
        return _skillWithState(skill, skillAnswersCollection);
      }
    });
    if (nextSkills.length > 3) {
      nextSkills = nextSkills.slice(0, 3);
    }
    return nextSkills;
  }

  _instance.doneSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: -1, shortDescription: 1},
    };
    var doneSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
        return _skillWithState(skill, skillAnswersCollection);
      }
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() >= 1) {
        return _skillWithState(skill, skillAnswersCollection);
      }
    });
    return doneSkills;
  }

  _instance.skillWithState = function (skillsCollection, skillId, skillAnswersCollection) {
    return _skillWithState(skillsCollection.findOne(new Meteor.Collection.ObjectID(skillId)), skillAnswersCollection);
  }

  function _skillWithState (skill, skillAnswersCollection) {
    if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
      skill.state = 'passed';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() >= 1) {
      skill.state = 'skipped';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() === 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'with-difficulty'}).count() >= 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'unable'}).count() >= 1) {
      skill.state = 'tried';
    } else {
      skill.state = 'not-started';
    }
    return skill;
  }
}
