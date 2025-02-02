'use strict';

var app = angular.module(
  'rpApp'
, [ 'ngCookies'
  , 'ngRoute'
  , 'ngAnimate'
  , 'pascalprecht.translate'
  , 'duScroll'
  , 'headroom'
  , 'nvd3ChartDirectives'
  , 'rpApp.services'
  , 'rpApp.controllers'
  , 'rpApp.directives'
  ]
);

app.config(function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    , controller: 'HomeCtrl'
    })
    .when('/technologies/:id?', {
      templateUrl: 'views/technologies.html'
    , controller: 'TechnologiesCtrl'
    })
    .when('/logo', {
      templateUrl: 'views/logo.html'
    , controller: 'LogoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  // $locationProvider.html5Mode(true);

  $translateProvider
    .useStaticFilesLoader({ prefix: 'i18n/', suffix: '.json' })
    .preferredLanguage('en') // avoid FOUC
    .fallbackLanguage('en')
    .useCookieStorage();
});

app.value('duScrollEasing', function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 });

app.constant('moment', moment);

app.run(function($rootScope, $location) {
  $rootScope.$on('duScrollspy:becameActive', function($event, $element) {
    // todo
  });
});

'use strict';

var services = angular.module(
  'rpApp.services'
, []
);

services.service("MenuSrvc", function() {
  var that = this;
  that.items = [
    { name: 'home', icon: 'home', url: '/' }
  , { name: 'technologies', icon: 'briefcase', url: '/#/technologies' }
  // , { name: 'stories', icon: 'book', url: '/#/stories' }
  // , { name: 'lab', icon: 'cog', url: '/#/lab' }
  ];
  that.current;
  that.select = function(name) {
    that.current = _.find(that.items, function(item) {
      return item.name == name;
    });
  }
});

'use strict';

var controllers = angular.module(
  'rpApp.controllers'
, []
);

controllers.controller('AppCtrl', function($scope, $routeParams, $document, $location, $anchorScroll, $timeout) {
  $scope.$on('$viewContentLoaded', function() {
    $document.scrollTop(0, 0);
    if ($routeParams.id) {
      $timeout(function() {
        $document.scrollToElement(angular.element(document.getElementById($routeParams.id)), 120, 2000);
      }, 1000);
    }
  });
});

controllers.controller('MenuCtrl', function($scope, MenuSrvc) {
  $scope.menu = {};

  $scope.menu.items = MenuSrvc.items;
  $scope.menu.current = {};
  $scope.menu.isActive = false;
  $scope.menu.change = function(item) {
    MenuSrvc.current = item;
    $scope.menu.toggle();
  }
  $scope.menu.toggle = function() {
    $scope.menu.isActive = !$scope.menu.isActive;
  }

  $scope.$watch(function() { return MenuSrvc.current; }, function(current) {
    $scope.menu.current = current;
  });
});

controllers.controller("HomeCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("home");
});

controllers.controller("TechnologiesCtrl", function($scope, MenuSrvc, moment) {
  MenuSrvc.select("technologies");

  $scope.adoption = {};
  $scope.adoption.data = [
    {key: 'Javascript', values: [[2008,2060],[2009,8119],[2010,23095],[2011,60754],[2012,156521],[2013,327467],[2014,487971]]}
  , {key: 'Java', values: [[2008,596],[2009,4157],[2010,14342],[2011,46227],[2012,111277],[2013,230600],[2014,394101]]}
  , {key: 'Ruby', values: [[2008,7992],[2009,17717],[2010,31661],[2011,70541],[2012,125652],[2013,212310],[2014,275484]]}
  , {key: 'Python', values: [[2008,1497],[2009,7670],[2010,18028],[2011,40917],[2012,79114],[2013,146274],[2014,225141]]}
  , {key: 'PHP', values: [[2008,782],[2009,4529],[2010,14361],[2011,37150],[2012,78320],[2013,150619],[2014,224670]]}
  , {key: 'C++', values: [[2008,544],[2009,2755],[2010,6543],[2011,17530],[2012,39759],[2013,81579],[2014,125229]]}
  , {key: 'C', values: [[2008,936],[2009,4454],[2010,9940],[2011,21692],[2012,41240],[2013,75632],[2014,113556]]}
  , {key: 'Obj-C', values: [[2008,312],[2009,1771],[2010,3779],[2011,10449],[2012,25676],[2013,51792],[2014,86268]]}
  // , {'key': 'Perl', values: [[2008,772],[2009,25709],[2010,5927],[2011,9151],[2012,12647],[2013,15935],[2014,17385]]}
  ];
  $scope.adoption.xAxisTickFormat = function() { return function(d, i) { return d; }; };
  $scope.adoption.yAxisTickFormat = function() { return function(d, i) { return parseInt(d/1000)+'k'; }; };

  $scope.ecosystem = {};
  $scope.ecosystem.data = [
    { key: 'npm (Javascript)'
    , values: [
        [1327968000,6788]
      , [1330473600,7603]
      , [1333152000,8415]
      , [1335744000,9429]
      , [1338422400,10463]
      , [1341014400,11499]
      , [1343692800,12659]
      , [1346371200,14013]
      , [1348963200,15335]
      , [1351641600,16849]
      , [1354233600,18478]
      , [1356912000,19984]
      , [1359590400,22021]
      , [1362009600,23863]
      , [1364688000,26400]
      , [1367280000,28841]
      , [1369958400,31246]
      , [1372550400,33761]
      , [1375228800,36617]
      , [1377907200,39467]
      , [1380499200,42510]
      , [1383177600,45780]
      , [1385769600,49223]
      , [1388448000,52888]
      , [1391126400,57172]
      , [1393545600,61526]
      , [1396224000,66670]
      , [1398816000,70682]
      , [1401494400,75998]
      , [1403568000,79965]
      ]
    }
  , { key: 'Maven Central (Java)'
    , values: [
        [1327968000,null]
      , [1330473600,null]
      , [1333152000,null]
      , [1335744000,null]
      , [1338422400,null]
      , [1341014400,null]
      , [1343692800,null]
      , [1346371200,null]
      , [1348963200,null]
      , [1351641600,null]
      , [1354233600,null]
      , [1356912000,null]
      , [1359590400,null]
      , [1362009600,null]
      , [1364688000,55805]
      , [1367280000,57406]
      , [1369958400,58726]
      , [1372550400,60576]
      , [1375228800,62044]
      , [1377907200,63318]
      , [1380499200,64585]
      , [1383177600,66141]
      , [1385769600,67732]
      , [1388448000,69087]
      , [1391126400,70419]
      , [1393545600,71815]
      , [1396224000,74161]
      , [1398816000,76672]
      , [1401494400,78933]
      , [1403568000,80506]
      ]
    }
  , { key: 'Rubygems (Ruby)'
    , values: [
        [1327968000,33582]
      , [1330473600,35036]
      , [1333152000,36561]
      , [1335744000,38010]
      , [1338422400,39494]
      , [1341014400,40832]
      , [1343692800,42207]
      , [1346371200,43556]
      , [1348963200,44826]
      , [1351641600,46276]
      , [1354233600,47768]
      , [1356912000,49135]
      , [1359590400,50664]
      , [1362009600,52182]
      , [1364688000,53944]
      , [1367280000,55709]
      , [1369958400,57369]
      , [1372550400,58783]
      , [1375228800,60380]
      , [1377907200,61988]
      , [1380499200,63412]
      , [1383177600,65158]
      , [1385769600,66718]
      , [1388448000,68210]
      , [1391126400,69748]
      , [1393545600,71389]
      , [1396224000,73020]
      , [1398816000,74691]
      , [1401494400,76282]
      , [1403568000,77517]
      ]
    }
  , { key: 'PyPI (Python)'
    , values: [
        [1327968000,18865]
      , [1330473600,19429]
      , [1333152000,20180]
      , [1335744000,20629]
      , [1338422400,21329]
      , [1341014400,22042]
      , [1343692800,22820]
      , [1346371200,23589]
      , [1348963200,24343]
      , [1351641600,25172]
      , [1354233600,26105]
      , [1356912000,26630]
      , [1359590400,27582]
      , [1362009600,28534]
      , [1364688000,29489]
      , [1367280000,30466]
      , [1369958400,31303]
      , [1372550400,32155]
      , [1375228800,33185]
      , [1377907200,34264]
      , [1380499200,35116]
      , [1383177600,36174]
      , [1385769600,37214]
      , [1388448000,38376]
      , [1391126400,39492]
      , [1393545600,40431]
      , [1396224000,41771]
      , [1398816000,43007]
      , [1401494400,44386]
      , [1403568000,45457]
      ]
    }
  , { key: 'Packagist (PHP)'
    , values: [
        [1327968000,null]
      , [1330473600,null]
      , [1333152000,null]
      , [1335744000,null]
      , [1338422400,null]
      , [1341014400,null]
      , [1343692800,null]
      , [1346371200,null]
      , [1348963200,null]
      , [1351641600,null]
      , [1354233600,null]
      , [1356912000,null]
      , [1359590400,null]
      , [1362009600,8016]
      , [1364688000,9170]
      , [1367280000,10295]
      , [1369958400,11434]
      , [1372550400,12613]
      , [1375228800,13971]
      , [1377907200,15220]
      , [1380499200,16671]
      , [1383177600,18212]
      , [1385769600,19742]
      , [1388448000,21389]
      , [1391126400,23193]
      , [1393545600,25005]
      , [1396224000,26953]
      , [1398816000,28884]
      , [1401494400,31035]
      , [1403568000,32495]
      ]
    }
  , { key: 'nuget (.Net)'
    , values: [
        [1327968000,null]
      , [1330473600,4830]
      , [1333152000,5294]
      , [1335744000,5690]
      , [1338422400,6096]
      , [1341014400,6509]
      , [1343692800,7030]
      , [1346371200,7643]
      , [1348963200,7997]
      , [1351641600,8470]
      , [1354233600,8889]
      , [1356912000,9450]
      , [1359590400,10017]
      , [1362009600,10801]
      , [1364688000,11429]
      , [1367280000,12101]
      , [1369958400,12626]
      , [1372550400,13238]
      , [1375228800,13969]
      , [1377907200,14665]
      , [1380499200,15494]
      , [1383177600,16585]
      , [1385769600,16999]
      , [1388448000,17653]
      , [1391126400,18456]
      , [1393545600,19327]
      , [1396224000,20303]
      , [1398816000,22187]
      , [1401494400,23402]
      , [1403568000,24054]
      ]
    }
  // , { key: 'Clojars (Clojure)'
  //   , values: [
  //       [1327968000,null]
  //     , [1330473600,null]
  //     , [1333152000,null]
  //     , [1335744000,null]
  //     , [1338422400,null]
  //     , [1341014400,null]
  //     , [1343692800,null]
  //     , [1346371200,null]
  //     , [1348963200,null]
  //     , [1351641600,null]
  //     , [1354233600,4862]
  //     , [1356912000,5062]
  //     , [1359590400,5334]
  //     , [1362009600,5565]
  //     , [1364688000,5864]
  //     , [1367280000,6093]
  //     , [1369958400,6359]
  //     , [1372550400,6590]
  //     , [1375228800,6829]
  //     , [1377907200,7083]
  //     , [1380499200,7283]
  //     , [1383177600,7497]
  //     , [1385769600,7755]
  //     , [1388448000,7972]
  //     , [1391126400,8258]
  //     , [1393545600,8517]
  //     , [1396224000,8777]
  //     , [1398816000,9048]
  //     , [1401494400,9363]
  //     , [1403568000,9555]
  //     ]
  //   }
  , { key: 'CPAN (Perl)'
    , values: [
        [1327968000,24197]
      , [1330473600,24345]
      , [1333152000,24562]
      , [1335744000,24733]
      , [1338422400,24935]
      , [1341014400,25153]
      , [1343692800,25388]
      , [1346371200,25576]
      , [1348963200,25785]
      , [1351641600,26009]
      , [1354233600,26269]
      , [1356912000,26513]
      , [1359590400,26738]
      , [1362009600,26956]
      , [1364688000,27190]
      , [1367280000,27411]
      , [1369958400,27645]
      , [1372550400,27844]
      , [1375228800,28013]
      , [1377907200,28191]
      , [1380499200,28415]
      , [1383177600,28582]
      , [1385769600,28754]
      , [1388448000,28909]
      , [1391126400,29057]
      , [1393545600,29092]
      , [1396224000,29298]
      , [1398816000,29486]
      , [1401494400,29666]
      , [1403568000,29829]
      ]
    }
  , { key: 'Hackage (Haskell)'
    , values: [
        [1327968000,3697]
      , [1330473600,3786]
      , [1333152000,3861]
      , [1335744000,3945]
      , [1338422400,4025]
      , [1341014400,4097]
      , [1343692800,4156]
      , [1346371200,4253]
      , [1348963200,4331]
      , [1351641600,4442]
      , [1354233600,4529]
      , [1356912000,4604]
      , [1359590400,4666]
      , [1362009600,4714]
      , [1364688000,4837]
      , [1367280000,4911]
      , [1369958400,4911]
      , [1372550400,5129]
      , [1375228800,5200]
      , [1377907200,5302]
      , [1380499200,5383]
      , [1383177600,5335]
      , [1385769600,5673]
      , [1388448000,5673]
      , [1391126400,5971]
      , [1393545600,6122]
      , [1396224000,6238]
      , [1398816000,6372]
      , [1401494400,6490]
      , [1403568000,6582]
      ]
    }
  ];
  $scope.ecosystem.xAxisTickFormat = function() { return function(d, i) { return moment.unix(d).format('MMM YYYY'); }; };
  $scope.ecosystem.yAxisTickFormat = function() { return function(d, i) { return parseInt(d/1000)+'k'; }; };

  $scope.performance = {};
  $scope.performance.data = [
    { key: 'styl', values: [['Browser versions', 0]]},
    { key: 'data'
    , values: [
        ['Chrome 23.0.1271.91', 3488.7],
        ['Chrome 21.0.1189.89', 3519.4],
        ['Chrome 22.0.1229.94', 3582.8],
        ['Chrome 24.0.1312.14', 3583.2],
        ['Chrome 19.0.1084.56', 3758.9],
        ['Firefox 18.0b1', 3895.2],
        ['Firefox 18.0a', 4099.6],
        ['Chrome 18.01025.168', 4107.6],
        ['Chrome 17.0.963.83', 4352.9],
        ['Firefox 10.0.7', 4600.7],
        ['Chrome 15.0.874.121', 4753.8],
        ['Firefox 17.0', 4829.6],
        ['Chrome 16.0.912.77', 4857.7],
        ['Firefox 16.0b3', 4884.6],
        ['Firefox 15.0.1', 4930.1],
        ['Firefox 9.0.1', 5039.7],
        ['Firefox 11.0', 5114.7],
        ['Chrome 14.0.835.202', 5120.4],
        ['Firefox 14.0.1', 5350.3],
        ['Firefox 12.0', 5380.6],
        ['Firefox 13.0.1', 5452.3],
        ['Chrome 10.0.648.151', 5838.4],
        ['Chrome 11.0.696.77', 5886.4],
        ['Firefox 8.0.1', 6883.0],
        ['Firefox 7.0.1', 6981.7],
        ['Firefox 6.0.2', 7351.9],
        ['Firefox 4.0.1', 7509.8],
        ['Firefox 5.0.1', 7973.9],    
        ['Chrome 12.0.742.112', 9300.0],
        ['Chrome 13.0.782.99', 9362.7],
        ['Opera 12.11', 12418.1],
        ['Opera 12.02', 12774.9],
        ['Opera 12.12', 12793.8],
        ['Opera 11.64', 12949.2],
        ['Opera 11.11', 13490.4],
        ['Opera 10.63', 13535.8],
        ['Chrome 8.0.552.237', 14434.6],
        ['Chrome 9.0.597.107', 14471.1], 
        ['Safari 5.17', 14750.3], 
        ['Chrome 7.0.517.44', 15186.9],    
        ['Chrome 6.0.453.1', 17277.1],
        ['Chrome 5.0.375.126', 17980.7],
        ['Safari 5.05', 18211.7],
        ['Safari 4.05', 21183.7],
        ['Chrome 4.0.223', 23142.2],
        ['Firefox 3.6.28', 25075.7],
        ['Chrome 3.0.182', 27886.5],
        ['Firefox 3.5.19', 28835.3]
      ]
    }
  ];
  $scope.performance.xAxisTickFormat = function() { return function(d, i) { return d; }; };
  $scope.performance.yAxisTickFormat = function() { return function(d, i) { return d; }; };
  $scope.performance.color = function() { return function(d, i) { return '#cd4436'; }; };
});

controllers.controller("LogoCtrl", function($scope) {
  $scope.logo = {
    icon: 'send'
  , size: 256
  , color: 'cd4436'
  , background: 'ffffff'
  };
});

controllers.controller("StoriesCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("stories");
});

controllers.controller("LabCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("lab");
});

'use strict';

var directives = angular.module('rpApp.directives', []);

directives.directive('rpHidden', function($window) {
  return {
    restrict: 'A'
  , scope: {}
  , link: function($scope, $element) {
      var window = angular.element($window);

      var handler = function() {
        var scrollTop = window.scrollTop()
          , elementY = $element.height();

        if (scrollTop > elementY) $element.addClass('rp-hidden');
        else $element.removeClass('rp-hidden');
      };

      window.on('scroll', handler);

      handler();
    }
  };
});
