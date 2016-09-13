(function() {
  'use strict';

  angular
    .module('meetUpUda')
    .directive('vmShare', vmShare);

  /** @ngInject */
  function vmShare() {
    var directive = {
      restrict: 'EA',
      scope: {
        type: '=',
        meeting: '='
      },
      templateUrl: 'app/components/presentation/share/share.html',
      link: linkFunc,
      controller: ShareController,
      controllerAs: 'vm',
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;

      watcher = scope.$watch('', function() {

      });
      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function ShareController($log) {
      var vm = this;


    }

  }

})();
