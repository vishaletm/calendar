'use strict';

describe('Controller: MonthCtrl', function () {

  // load the controller's module
  beforeEach(module('calendarApp', 'stateMock'));

  var MonthCtrl, scope, state, stateParams, monthMockup, utils, currentYear, currentMonth;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _utils_, stateMock) {
    scope = $rootScope.$new();

    state = stateMock;

    monthMockup = {
      query : function () {}
    };

    utils = _utils_;

  }));

  beforeEach(inject(function ($controller) {
    currentYear = 2015;
    currentMonth = 8;

    stateParams = {
      year  : currentYear,
      month : currentMonth
    };

    MonthCtrl = $controller('MonthCtrl', {
      $scope       : scope,
      $state       : state,
      $stateParams : stateParams,
      utils        : utils,
      Month        : monthMockup
    });

    state.expectTransitionTo('month', {year : 2015, month : 8});
    scope.$digest();
  }));

  describe('model variables', function () {

    it('should be defined', function () {
      expect(MonthCtrl).toBeDefined();
    });

    it('should be defined and valid', function () {
      expect(scope.month).toBe(currentMonth);
      expect(scope.monthName).toBe('August');
      expect(scope.nextMonthName).toBe('September');
      expect(scope.previousMonthName).toBe('July');
      expect(scope.year).toBe(currentYear);
      expect(scope.previousYear).toBe(currentYear);
      expect(scope.nextYear).toBe(currentYear);
    });

  });

  describe('model variables when current month is January', function () {

    beforeEach(inject(function ($controller) {
      currentYear = 2015;
      currentMonth = 1;

      stateParams = {
        year  : currentYear,
        month : currentMonth
      };

      MonthCtrl = $controller('MonthCtrl', {
        $scope       : scope,
        $state       : state,
        $stateParams : stateParams,
        utils        : utils,
        Month        : monthMockup
      });
    }));

    it('should be defined and valid after getPrevious', function () {
      var previous = scope.getPreviousMonthAndYear();
      expect(previous.month).toBe(12);
      expect(previous.year).toBe(2014);
    });

  });

  describe('model variables when current month is December', function () {

    beforeEach(inject(function ($controller) {
      currentYear = 2015;
      currentMonth = 12;

      stateParams = {
        year  : currentYear,
        month : currentMonth
      };

      MonthCtrl = $controller('MonthCtrl', {
        $scope       : scope,
        $state       : state,
        $stateParams : stateParams,
        utils        : utils,
        Month        : monthMockup
      });
    }));

    it('should be defined and valid after getNext', function () {
      var next = scope.getNextMonthAndYear();
      expect(next.month).toBe(1);
      expect(next.year).toBe(2016);
    });

  });

  describe('state', function () {

    it('should transition correctly on invoking previous', function () {
      state.expectTransitionTo('month', {year : 2015, month : 7});
      scope.previous();
      state.ensureAllTransitionsHappened();
    });

    it('should transition correctly on invoking next', function () {
      state.expectTransitionTo('month', {year : 2015, month : 9});
      scope.next();
      state.ensureAllTransitionsHappened();
    });

    it('should transition correctly on month change', function () {
      state.expectTransitionTo('month', {year : 2015, month : 1});
      scope.month = 1;
      scope.$digest();
      state.ensureAllTransitionsHappened();
    });

    it('should transition correctly on year change', function () {
      state.expectTransitionTo('month', {year : 1979, month : 8});
      scope.year = 1979;
      scope.$digest();
      state.ensureAllTransitionsHappened();
    });

  });
});