'use strict';

describe('Directive: month', function () {

  // load the directive's module and views
  beforeEach(module('calendarApp', 'app/views/month.html'));

  var element, scope, $compile, template, year, utils;

  beforeEach(inject(function ($rootScope, _$compile_, $templateCache, _utils_) {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';

    scope = $rootScope.$new();
    $compile = _$compile_;

    // Load the template from the test relative path and store it into the directive-relative path
    // http://www.portlandwebworks.com/blog/testing-angularjs-directives-handling-external-templates
    template = $templateCache.get('app/views/month.html');
    $templateCache.put('views/month.html', template);

    utils = _utils_;

    scope.weekdaysLookup = utils.weekdaysLookup;

    year = getJSONFixture('2015.json'); // load the data for 2015 from the test/mock/2015.json fixture
  }));

  describe('calendar for 2015 February', function () {

    beforeEach(function () {
      scope.month = year.months[1]; // let us test with the month of February

      element = angular.element('<month month="month"></month>');
      element = $compile(element)(scope);
      scope.$digest();
    });

    it('should be a div element', function () {
      expect(element[0].tagName).toBe('DIV');
    });

    it('should have one table element as child', function () {
      expect(element.find('table').length).toBe(1);
    });

    it('should have 5 rows in the table', function () {
      expect(element.find('tr').length).toBe(5);
    });

    it('should have 28 cells in the table', function () {
      expect(element.find('div.gregorian').length).toBe(28);
    });

    it('should have 28 non-empty cells in the table', function () {
      expect(element.find('div.gregorian:not(:empty)').length).toBe(28);
    });

    it('should have the year as 2015', function () {
      var monthYear = element.find('.month-year');
      expect(monthYear.find('h1').html()).toBe('2015');
    });

    describe('month-masthead', function () {

      it('should be a div element', function () {
        expect(element.find('.month-masthead')[0].tagName).toBe('DIV');
      });

      it('should have the correct month name', function () {
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.month-name').html()).toBe('February | ഫെബ്രുവരി');
      });

      it('should have malayalam year as 1190', function () {
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.malayalam-year').html()).toBe('1190');
      });

      it('should have the correct malayalam month names', function () {
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.malayalam-month').html()).toBe('മകരം - കുംഭം');
      });

    });

    describe('first row', function () {

      it('should have 0 empty cells', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian:empty').length).toBe(0);
      });

      it('should have its 1st cell with the date 1', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian')[0].innerHTML).toBe('1');
      });

      it('should have its 1st cell with the malayalam date 19', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.malayalam-day')[0].innerHTML).toBe('19');
      });

      it('should have its 1st cell with the correct naksatra', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.naksatra')[0].innerHTML).toBe('&nbsp; തിരുവാതിര');
      });

      it('should have its 2nd cell with the date 2', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian')[1].innerHTML).toBe('2');
      });

      it('should have its 2nd cell with the malayalam date 20', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.malayalam-day')[1].innerHTML).toBe('20');
      });

      it('should have its 2nd cell with the correct naksatra', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.naksatra')[1].innerHTML).toBe('&nbsp; പുണർതം');
      });

    });

    describe('last row', function () {

      it('should have 0 empty cells', function () {
        var lastRow = element.find('tr:nth-of-type(5)');
        expect(lastRow.find('div.gregorian:empty').length).toBe(0);
      });

      it('should have its last cell with the date 28', function () {
        var lastRow = element.find('tr:nth-of-type(5)');
        expect(lastRow.find('div.gregorian')[6].innerHTML).toBe('28');
      });

      it('should have its last cell with the malayalam date 16', function () {
        var lastRow = element.find('tr:nth-of-type(5)');
        expect(lastRow.find('div.malayalam-day')[6].innerHTML).toBe('16');
      });

      it('should have its last cell with the correct naksatra', function () {
        var lastRow = element.find('tr:nth-of-type(5)');
        expect(lastRow.find('div.naksatra')[6].innerHTML).toBe('&nbsp; തിരുവാതിര');
      });

    });

  });

  describe('calendar for 2015 May', function () {

    beforeEach(function () {
      scope.month = year.months[4]; // let us test with the month of May

      element = angular.element('<month month="month"></month>');
      element = $compile(element)(scope);
      scope.$digest();
    });

    it('should be a div element', function () {
      expect(element[0].tagName).toBe('DIV');
    });

    it('should have one table element as child', function () {
      expect(element.find('table').length).toBe(1);
    });

    it('should have 7 rows in the table', function () {
      expect(element.find('tr').length).toBe(7);
    });

    it('should have 42 cells in the table', function () {
      expect(element.find('div.gregorian').length).toBe(42);
    });

    it('should have 31 non-empty cells in the table', function () {
      expect(element.find('div.gregorian:not(:empty)').length).toBe(31);
    });

    it('should have the year as 2015', function () {
      var monthYear = element.find('.month-year');
      expect(monthYear.find('h1').html()).toBe('2015');
    });

    describe('month-masthead', function () {

      it('should be a div element', function () {
        expect(element.find('.month-masthead')[0].tagName).toBe('DIV');
      });

      it('should have the correct month name', function () {
        /* jshint -W100 */
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.month-name').html()).toBe('May | മെയ്‌' );
      });

      it('should have malayalam year as 1190', function () {
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.malayalam-year').html()).toBe('1190');
      });

      it('should have the correct malayalam month names', function () {
        var monthMasthead = element.find('.month-masthead');
        expect(monthMasthead.find('.malayalam-month').html()).toBe('മേടം - ഇടവം');
      });

    });

    describe('first row', function () {

      it('should have 5 empty cells', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian:empty').length).toBe(5);
      });

      it('should have its 6th cell with the date 1', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian')[5].innerHTML).toBe('1');
      });

      it('should have its 6th cell with the malayalam date 18', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.malayalam-day')[5].innerHTML).toBe('18');
      });

      it('should have its 6th cell with the correct naksatra', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.naksatra')[5].innerHTML).toBe('&nbsp; അത്തം');
      });

      it('should have its 7th cell with the date 2', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.gregorian')[6].innerHTML).toBe('2');
      });

      it('should have its 7th cell with the malayalam date 18', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.malayalam-day')[6].innerHTML).toBe('19');
      });

      it('should have its 7th cell with the correct naksatra', function () {
        var firstRow = element.find('tr:nth-of-type(2)');
        expect(firstRow.find('div.naksatra')[6].innerHTML).toBe('&nbsp; ചിത്ര');
      });

    });

    describe('last row', function () {

      it('should have 6 empty cells', function () {
        var lastRow = element.find('tr:nth-of-type(7)');
        expect(lastRow.find('div.gregorian:empty').length).toBe(6);
      });

      it('should have its first cell with the date 30', function () {
        var lastRow = element.find('tr:nth-of-type(7)');
        expect(lastRow.find('div.gregorian')[0].innerHTML).toBe('31');
      });

      it('should have its first cell with the malayalam date 18', function () {
        var lastRow = element.find('tr:nth-of-type(7)');
        expect(lastRow.find('div.malayalam-day')[0].innerHTML).toBe('17');
      });

      it('should have its first cell with the correct naksatra', function () {
        var lastRow = element.find('tr:nth-of-type(7)');
        expect(lastRow.find('div.naksatra')[0].innerHTML).toBe('&nbsp; ചോതി');
      });

    });

  });

});