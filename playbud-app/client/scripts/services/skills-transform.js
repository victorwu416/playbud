angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  _instance.appropriateSkills = function (skillsCollection, skillAnswersCollection) {
    var appropriateSkills = _.filter(skillsCollection.find({}).fetch(), function (skill) {
      // Ignore skills that already have 2 or more 'easily' answers
      return skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2;
    });    
    return appropriateSkills;
  }
}
