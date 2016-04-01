angular
  .module('Playbud')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('first', {
      url: '/first',
        templateUrl: 'client/templates/first.html'
    })
    .state('help', {
      url: '/help',
        templateUrl: 'client/templates/help.html'        
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html'
    })
    .state('tab.play', {
      url: '/play',
      views: {
        'tab-play': {
          templateUrl: 'client/templates/play.html',
          controller: 'PlayCtrl as play'
        }
      }
    })
    .state('tab.skill', {
      url: '/skills/:skillId',
      views: {
        'tab-play': {
          templateUrl: 'client/templates/skill.html',
          controller: 'SkillCtrl as skill'
        }
      }
    })
    .state('tab.playbud-account', {
      url: '/playbud-account/:loggedOutSection',
      views: {
        'tab-playbud-account': {
          templateUrl: 'client/templates/playbud-account.html',
          controller: 'PlaybudAccountCtrl as playbudAccount'
        }
      }
    });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    if (Meteor.user()) {
      return 'tab/play';
    } else {
      return 'first';
    }
  });
}
