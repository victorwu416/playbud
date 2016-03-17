angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  _instance.appropriateSkills = function (skillsCollection, skillAnswersCollection) {
    var appropriateSkills = _.filter(skillsCollection.find({}).fetch(), function (skill) {
      // Do not return skills that already have 2 or more 'easily' answers
      return skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2;
    });    
    return appropriateSkills;
  };

  _instance.skillsWithStates = function (skillsCollection, skillAnswersCollection) {
    var skillsWithStates = _.map(skillsCollection.find({}).fetch(), function (skill) {
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
    });
    return skillsWithStates;
  };
}
