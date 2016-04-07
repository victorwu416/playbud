angular
  .module('Playbud')
  .config(config)
  .run(run);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('first', {
      url: '/first',
      templateUrl: 'client/templates/first.html',
      controller: 'FirstCtrl as first'
    })
    .state('help', {
      url: '/help',
      templateUrl: 'client/templates/help.html'
    })
    .state('toy', {
      url: '/toy',
      templateUrl: 'client/templates/toy.html'
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      controller: 'TabsCtrl as tabs'
    })
    .state('tab.play', {
      url: '/play',
      views: {
        'tab-play': {
          templateUrl: 'client/templates/play.html',
          controller: 'PlayCtrl as play'
        }
      },
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId()) {
            return $q.resolve();
          } else if (Session.get('ephemeralUserId')) {
            return $q.resolve();
          } else {
            return $q.reject('not-logged-in-not-ephemeral-user');
          }
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

  $urlRouterProvider.otherwise('tab/play');
}

function run($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'not-logged-in-not-ephemeral-user') {
      return $state.go('first');
    }
  });
  Session.set('ephemeralUserId', '');
}
