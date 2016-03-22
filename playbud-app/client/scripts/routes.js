angular
  .module('Playbud')
  .config(config)
  .run(run);

  function run($rootScope, $state) {

      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        if( error  === 'not authorized' ){
            return $state.go( 'login' );
        }
      });
  }

function config($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject();
          }
          else {
            return $q.resolve();
          }
        }
      }
    })
    .state('tab.progress', {
      url: '/progress',
      views: {
        'tab-progress': {
          templateUrl: 'client/templates/progress.html',
          controller: 'ProgressCtrl as progress'
        }
      }
    })
    .state('tab.play-ideas', {
      url: '/play-ideas',
      views: {
        'tab-play-ideas': {
          templateUrl: 'client/templates/play-ideas.html',
          controller: 'PlayIdeasCtrl as playIdeas'
        }
      }
    })
    .state('tab.play-idea', {
      url: '/play-ideas/:skillId',
      views: {
        'tab-play-ideas': {
          templateUrl: 'client/templates/play-idea.html',
          controller: 'PlayIdeaCtrl as playIdea'
        }
      }
    })
    .state('tab.evaluate', {
      url: '/evaluate',
      views: {
        'tab-evaluate': {
          templateUrl: 'client/templates/evaluate.html',
          controller: 'EvaluateCtrl as evaluate'
        }
      }
    })
    .state('tab.playbud-account', {
      url: '/playbud-account',
      views: {
        'tab-playbud-account': {
          templateUrl: 'client/templates/playbud-account.html',
          controller: 'PlaybudAccountCtrl as playbudAccount'
        }
      }
    })
    .state('signup', {
      url: '/signup',
          templateUrl: 'client/templates/signup.html',
          controller: 'SignupCtrl as signup'
    })
    .state('login', {
      url: '/login',
          templateUrl: 'client/templates/login.html',
          controller: 'LoginCtrl as login'
    })
    .state('user-profile', {
      url: '/user-profile',
          templateUrl: 'client/templates/user-profile.html',
          controller: 'UserProfileCtrl as profile',
          resolve: {
            currentUser: ($q) => {
              if (Meteor.userId() == null) {
                return $q.reject();
              }
              else {
                return $q.resolve();
              }
            }
          }
    });

  $urlRouterProvider.otherwise('login');
}
