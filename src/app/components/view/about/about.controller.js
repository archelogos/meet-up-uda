(function() {
  'use strict';

  angular
    .module('meetUpUda')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController($timeout, Data) {
    var vm = this;
    Data.notify('initialResolved');
    Data.notify('partialResolved');

  }
})();
