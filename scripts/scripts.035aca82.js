"use strict";angular.module("calendarApp",["ngAnimate","ngCookies","ngResource","ui.router","ngSanitize","ngTouch","xeditable","cgBusy"]).config(["$locationProvider","$stateProvider","$urlRouterProvider",function(a,b,c){a.hashPrefix("!"),c.otherwise("/"),b.state("year",{url:"/{year:int}?lang&sel",params:{year:(new Date).getFullYear()},templateUrl:"views/year.html"}).state("month",{url:"/{year:int}/{month:int}?lang&sel",templateUrl:"views/month.html"})}]).run(["$anchorScroll","editableOptions",function(a,b){a.yOffset=60,b.theme="bs3"}]),$(function(){$.scrollUp({scrollDistance:105,scrollText:"",scrollTitle:"Back to the top"})}),angular.module("calendarApp").directive("version",function(){return{template:'<small><a title="{{title}}" ng-href="{{href}}" target="_blank">{{versionText}}</a></small>',restrict:"E",replace:!0,link:function(a){a.$watch("version",function(b){a.title="Built at: "+b.date,a.href="https://github.com/kollavarsham/calendar/tree/"+b.object,a.versionText=b.text},!0)}}}),angular.module("calendarApp").directive("yearPicker",function(){return{templateUrl:"views/year-picker.html",restrict:"E"}}),angular.module("calendarApp").directive("monthPicker",function(){return{templateUrl:"views/month-picker.html",restrict:"E"}}),angular.module("calendarApp").directive("monthNavbar",["$location","$anchorScroll",function(a,b){return{templateUrl:"views/month-navbar.html",restrict:"E",scope:{months:"=months"},link:function(c){c.scrollTo=function(c){var d=a.hash();a.hash(c),b(),a.hash(d)}}}}]),angular.module("calendarApp").directive("calendarMonth",["$timeout","utils",function(a,b){var c=function(a){var c=a.days.map(function(a){return a.malayalamMonth}),d=b.unique(c);return d.join(" - ")},d=function(a){var c=a.days.map(function(a){return a.malayalamYear}),d=b.unique(c);return d.join(" - ")};return{restrict:"E",replace:!0,templateUrl:"views/calendar-month.html",scope:{month:"=month",lang:"=lang",sel:"=sel"},link:function(e,f){var g=e.month,h=e.weeks=[];e.year=e.month.days[0].year,e.weekdaysLookup=b.weekdaysLookup,e.malayalamMonthNames=c(g),e.malayalamYears=d(g);for(var i=0;i<g.days.length;i++){var j=g.days[i];if((0===h.length||7===h[h.length-1].length)&&h.push([]),1===j.date){for(var k=Object.keys(e.weekdaysLookup),l=0,m=0;m<k.length;m++){var n=k[m];if(j.weekdayName===e.weekdaysLookup[n][e.lang]){l=n;break}}for(var o=0;l>o;o++)h[h.length-1].push({})}var p=new Date;if(j.isToday=j.year===p.getFullYear()&&j.month===b.monthsLookup[p.getMonth()+1].en&&j.date===p.getDate(),e.sel&&(j.isSelected=j.year===e.sel.getFullYear()&&j.month===b.monthsLookup[e.sel.getMonth()+1].en&&j.date===e.sel.getDate()),j.fullDate=j.date+" "+j.month+" "+j.year,h[h.length-1].push(j),i===g.days.length-1)for(var q=0,r=7-h[h.length-1].length;r>q;q++)h[h.length-1].push({})}a(function(){if(f.find(".selected").length){var b=f.find(".month-name").text().substr(0,3),c=angular.element(".month-nav").find("a").filter(function(){return $(this).text().match(new RegExp("^"+b))});a(function(){c.click()},10)}else if(f.find(".today").length){var d=f.find(".month-name").text().substr(0,3),e=angular.element(".month-nav").find("a").filter(function(){return $(this).text().match(new RegExp("^"+d))});a(function(){e.click()},10)}angular.element(".day-popover").popover()},0)}}}]),angular.module("calendarApp").directive("calendarDay",function(){return{restrict:"E",templateUrl:"views/calendar-day.html",scope:{day:"=day"}}}),angular.module("calendarApp").directive("scrollToTop",function(){return{template:'<a class="scroll-up" title="Back to the top">Top</a>',replace:!0,restrict:"E",link:function(a,b){b.on("click",function(){angular.element("#scrollUp").click()})}}}),angular.module("calendarApp").constant("serviceConfigConstant",{baseUrl:"http://calendar.kollavarsham.org/api/",config:{query:{method:"GET",isArray:!1,headers:{Accept:"application/json"}}}}),angular.module("calendarApp").service("utils",["$filter",function(a){this.unique=function(a){return a.filter(function(b,c){return a.indexOf(b)===c})},this.getMonths=function(){for(var a=[],b=0,c=Object.keys(this.monthsLookup),d=c.length;d>b;b++)a.push({value:parseInt(c[b],10),text:this.monthsLookup[c[b]].en});return a},this.getYears=function(){for(var a=[],b=1900;2051>b;b++)a.push({value:b,text:b});return a},this.weekdaysLookup={0:{en:"Sunday",ml:"ഞായർ"},1:{en:"Monday",ml:"തിങ്കൾ"},2:{en:"Tuesday",ml:"ചൊവ്വ"},3:{en:"Wednesday",ml:"ബുധൻ"},4:{en:"Thursday",ml:"വ്യാഴം"},5:{en:"Friday",ml:"വെള്ളി"},6:{en:"Saturday",ml:"ശനി"}},this.monthsLookup={1:{en:"January",ml:"ജനുവരി"},2:{en:"February",ml:"ഫെബ്രുവരി"},3:{en:"March",ml:"മാർച്ച്‌"},4:{en:"April",ml:"ഏപ്രിൽ "},5:{en:"May",ml:"മെയ്‌"},6:{en:"June",ml:"ജൂണ്‍"},7:{en:"July",ml:"ജൂലൈ"},8:{en:"August",ml:"ഓഗസ്റ്റ്‌"},9:{en:"September",ml:"സെപ്റ്റംബർ"},10:{en:"October",ml:"ഒക്ടോബർ"},11:{en:"November",ml:"നവംബർ"},12:{en:"December",ml:"ഡിസംബർ"}},this.showMonth=function(b){return function(){var c=a("filter")(b.calendar.months,{value:b.calendar.month});return b.calendar.month&&c.length?c[0].text:"Not set"}},this.showYear=function(b){return function(){var c=a("filter")(b.calendar.years,{value:b.calendar.year});return b.calendar.year&&c.length?c[0].text:"Not set"}}}]),angular.module("calendarApp").factory("Version",["$resource","serviceConfigConstant",function(a,b){return a("version.json",{},b.config)}]),angular.module("calendarApp").factory("Year",["$resource","serviceConfigConstant",function(a,b){return a(b.baseUrl+"years/:year?lang=:lang",{},b.config)}]),angular.module("calendarApp").factory("Month",["$resource","serviceConfigConstant",function(a,b){return a(b.baseUrl+"years/:year/months/:month?lang=:lang",{},b.config)}]),angular.module("calendarApp").controller("VersionCtrl",["$scope","Version",function(a,b){a.version=b.query()}]),angular.module("calendarApp").controller("YearCtrl",["$scope","$state","$stateParams","$filter","$window","utils","Year",function(a,b,c,d,e,f,g){a.init=function(){a.$watch("calendar.year",function(a){b.go("year",{year:a})});var d=Date.parse(c.sel);a.calendar={year:c.year,lang:"en"===c.lang?"en":"ml",sel:isNaN(d)?void 0:new Date(d),years:f.getYears(),previousYear:c.year-1,nextYear:c.year+1},a.calendar.data=g.query({year:a.calendar.year,lang:a.calendar.lang})},a.showYear=f.showYear(a),a.previous=function(){a.calendar.year=a.calendar.year-1},a.next=function(){a.calendar.year=a.calendar.year+1},e.onscroll=function(){a.calendar.backToTopVisibility=angular.element(document).scrollTop()>105,a.$digest()},a.init()}]),angular.module("calendarApp").controller("MonthCtrl",["$scope","$state","$stateParams","$filter","utils","Month",function(a,b,c,d,e,f){a.getPreviousMonthAndYear=function(){var b=a.calendar.month,c=a.calendar.year;return b-=1,0===b&&(b=12,c-=1),{month:b,year:c}},a.getNextMonthAndYear=function(){var b=a.calendar.month,c=a.calendar.year;return b+=1,b>12&&(b=1,c+=1),{month:b,year:c}},a.init=function(){a.$watchGroup(["calendar.year","calendar.month"],function(a){b.go("month",{year:a[0],month:a[1]})});var d=e.monthsLookup,g=Date.parse(c.sel);a.calendar={year:c.year,month:c.month,lang:"en"===c.lang?"en":"ml",sel:isNaN(g)?void 0:new Date(g),months:e.getMonths(),years:e.getYears()};var h=a.getPreviousMonthAndYear(),i=c.year!==h.year?h.year+" ":"",j=a.getNextMonthAndYear(),k=c.year!==j.year?" "+j.year:"";angular.merge(a.calendar,{monthName:d[a.calendar.month].en,previousMonthName:i+d[h.month].en,previousYear:h.year,nextMonthName:d[j.month].en+k,nextYear:j.year}),a.calendar.data=f.query({year:a.calendar.year,month:a.calendar.month,lang:a.calendar.lang})},a.showMonth=e.showMonth(a),a.showYear=e.showYear(a),a.previous=function(){var c=a.getPreviousMonthAndYear();b.go("month",{year:c.year,month:c.month})},a.next=function(){var c=a.getNextMonthAndYear();b.go("month",{year:c.year,month:c.month})},a.init()}]),angular.module("calendarApp").run(["$templateCache",function(a){a.put("views/calendar-day.html",'<a tabindex="0" class="btn day-popover" data-trigger="hover" title="{{day.fullDate}}" data-content="{{day.fullDate}}" data-placement="auto"> <div class="day" ng-class="{ \'sunday\' : $first }"> <div class="gregorian">{{day.date}}</div> <div class="malayalam-day">{{day.malayalamDay}}</div> <div class="naksatra">&#160; {{day.naksatra}}</div> </div> </a>'),a.put("views/calendar-month.html",'<div> <div class="clearfix month-masthead"> <div class="pull-left"><span class="month-name">{{month.name}} | {{month.days[0].mlMonth}}</span></div> <div class="pull-right"> <div class="malayalam-year">{{malayalamYears}}</div> <div class="malayalam-month">{{malayalamMonthNames}}</div> </div> </div> <div class="month-year text-center"><h1>{{year}}</h1></div> <table class="calendar-table"> <colgroup span="7"></colgroup> <tbody> <tr class="head"> <th scope="col" ng-repeat="weekday in weekdaysLookup" ng-class="weekday.en == \'Sunday\' ? \'sunday\' : \'\' "> <div>{{weekday.en | limitTo: 1}}</div> <div class="malayalam-weekday">{{weekday[lang]}}</div> </th> </tr> <tr ng-repeat="week in weeks"> <td ng-repeat="day in week" ng-class="{ \'today\' : day.isToday, \'selected\' : day.isSelected }"> <calendar-day day="day"></calendar-day> </td> </tr> </tbody> </table> </div>'),a.put("views/month-navbar.html",'<div ng-show="months" class="nav-container container"> <ul class="month-nav"> <li><span class="month-nav-label">Jump to:</span></li> <li ng-repeat="month in months"> <span class="month-nav-sep" ng-show="$first"> | </span> <a ng-click="scrollTo(\'month-{{month.name}}\')" title="{{month.name}}">{{month.name | limitTo: 3}}</a> <span class="month-nav-sep"> | </span> </li> </ul> </div>'),a.put("views/month-picker.html",'<a href="#" editable-select="calendar.month" data-e-ng-options="s.value as s.text for s in calendar.months" title="Click to change the month" buttons="no" class="month-select"> {{ showMonth() }} </a>'),a.put("views/month.html",'<div class="root" ng-controller="MonthCtrl"> <div id="calendar-nav" class="nav-container"> <span class="calendar-nav left"> <button ng-click="previous()" ng-disabled="calendar.previousYear < 1900"> &lt; {{calendar.previousMonthName}} </button> </span> <small> <month-picker></month-picker> <year-picker></year-picker> </small> <span class="calendar-nav right"> <button ng-click="next()" ng-disabled="calendar.nextYear > 2050"> {{calendar.nextMonthName}} &gt; </button> </span> </div> <div cg-busy="calendar.data"></div> <div class="calendar-container"> <div ng-repeat="month in calendar.data.months" id="{{ \'month-\' + month.name }}" class="calendar-month"> <div class="year-detail"> <a ui-sref="year({year: calendar.year, lang: calendar.lang, sel: calendar.sel})"> Back to {{calendar.year}} Calendar </a> </div> <calendar-month month="month" lang="calendar.lang" sel="calendar.sel"></calendar-month> </div> </div> </div>'),a.put("views/year-picker.html",'<a href="#" editable-select="calendar.year" data-e-ng-options="s.value as s.text for s in calendar.years" title="Click to change the year" buttons="no" class="year-select"> {{ showYear() }} </a>'),a.put("views/year.html",'<div class="root" ng-controller="YearCtrl"> <div id="calendar-nav" class="nav-container"> <span class="calendar-nav left"> <button ng-click="previous()" ng-disabled="calendar.previousYear < 1900"> &lt; {{calendar.previousYear}} </button> </span> <year-picker></year-picker> <span class="calendar-nav right"> <button ng-click="next()" ng-disabled="calendar.nextYear > 2050"> {{calendar.nextYear}} &gt; </button> </span> </div> <month-navbar months="calendar.data.months"></month-navbar> <div cg-busy="calendar.data"></div> <div class="calendar-container"> <div ng-repeat="month in calendar.data.months" id="{{ \'month-\' + month.name }}" class="calendar-month"> <div class="month-detail"> <a ui-sref="month({ year: calendar.year, month: $index + 1, lang: calendar.lang, sel: calendar.sel })"> View {{month.name}} {{calendar.year}} Calendar </a> </div> <span ng-show="calendar.backToTopVisibility" class="back-to-top"> <scroll-to-top></scroll-to-top> </span> <calendar-month month="month" lang="calendar.lang" sel="calendar.sel"></calendar-month> </div> </div> </div>')}]);