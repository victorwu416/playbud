angular
  .module('Playbud')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      // resolve: {
      //   user: isAuthorized,
      //   chats() {
      //     return Meteor.subscribe('chats');
      //   }
      // }
    })
    // .state('tab.chats', {
    //   url: '/chats',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'client/templates/chats.html',
    //       controller: 'ChatsCtrl as chats'
    //     }
    //   }
    // })
    // .state('tab.chat', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'client/templates/chat.html',
    //       controller: 'ChatCtrl as chat'
    //     }
    //   }
    // })
    // .state('login', {
    //   url: '/login',
    //   templateUrl: 'client/templates/login.html',
    //   controller: 'LoginCtrl as logger'
    // })
    // .state('confirmation', {
    //   url: '/confirmation/:phone',
    //   templateUrl: 'client/templates/confirmation.html',
    //   controller: 'ConfirmationCtrl as confirmation'
    // })
    // .state('profile', {
    //   url: '/profile',
    //   templateUrl: 'client/templates/profile.html',
    //   controller: 'ProfileCtrl as profile',
    //   resolve: {
    //     user: isAuthorized
    //   }
    // })
    // .state('tab.settings', {
    //   url: '/settings',
    //   views: {
    //     'tab-settings': {
    //       templateUrl: 'client/templates/settings.html',
    //       controller: 'SettingsCtrl as settings',
    //     }
    //   }
    // })
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
      url: '/play-ideas/:playIdeaId',
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
    });

  $urlRouterProvider.otherwise('tab/progress');

  ////////////
  //
  // function isAuthorized($q) {
  //   let deferred = $q.defer();
  //
  //   if (_.isEmpty(Meteor.user()))
  //     deferred.reject('AUTH_REQUIRED');
  //   else
  //     deferred.resolve();
  //
  //   return deferred.promise;
  // }
}
