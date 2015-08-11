"use strict";angular.module("calendarApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","xeditable","cgBusy"]).config(["$locationProvider","$routeProvider",function(a,b){b.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]).run(["$anchorScroll","editableOptions",function(a,b){a.yOffset=60,b.theme="bs3"}]),$(function(){$.scrollUp({scrollDistance:105,scrollText:"",scrollTitle:"Back to the top"})}),angular.module("calendarApp").controller("MainCtrl",["$scope","$location","$anchorScroll","$filter","$window","utils","Calendar",function(a,b,c,d,e,f,g){a.init=function(){a.$watch("year",function(b){a.previousYear=b-1,a.nextYear=b+1,a.calendar=g.query({year:b})}),a.year=(new Date).getFullYear();for(var b=[],c=1900;2051>c;c++)b.push({value:c,text:c});a.years=b,a.weekdaysLookup=f.weekdaysLookup},a.showYear=function(){var b=d("filter")(a.years,{value:a.year});return a.year&&b.length?b[0].text:"Not set"},a.previous=function(){a.year=a.year-1},a.next=function(){a.year=a.year+1},e.onscroll=function(){a.backToTopVisibility=angular.element(document).scrollTop()>105,a.$apply()},a.scrollTo=function(a){var d=b.hash();b.hash(a),c(),b.hash(d)},a.scrollToTop=function(){angular.element("#scrollUp").click()},a.init()}]),angular.module("calendarApp").directive("month",["utils",function(a){var b=function(b){var c=b.days.map(function(a){return a.malayalamMonth}),d=a.unique(c);return d.join(" - ")},c=function(b){var c=b.days.map(function(a){return a.malayalamYear}),d=a.unique(c);return d.join(" - ")};return{restrict:"E",replace:!0,templateUrl:"views/month.html",link:function(d){var e=a.weekdaysLookup,f=d.month;d.weeks=[];var g=d.weeks;d.malayalamMonthNames=b(f),d.malayalamYears=c(f);for(var h=0;h<f.days.length;h++){if((0===g.length||7===g[g.length-1].length)&&g.push([]),1===f.days[h].date){for(var i=Object.keys(e),j=0,k=0;k<i.length;k++){var l=i[k];if(f.days[h].weekdayName===e[l].ml){j=l;break}}for(var m=0;j>m;m++)g[g.length-1].push({})}if(g[g.length-1].push(f.days[h]),h===f.days.length-1)for(var n=0,o=7-g[g.length-1].length;o>n;n++)g[g.length-1].push({})}}}}]),angular.module("calendarApp").factory("Calendar",["$resource","serviceConfigConstant",function(a,b){return a(b.baseUrl+"years/:year?lang=ml",{},b.config)}]),angular.module("calendarApp").constant("serviceConfigConstant",{baseUrl:"http://calendar.kollavarsham.org/api/",config:{query:{method:"GET",isArray:!1,headers:{Accept:"application/json"}}}}),angular.module("calendarApp").service("utils",function(){this.unique=function(a){return a.filter(function(b,c){return a.indexOf(b)===c})},this.weekdaysLookup={0:{en:"Sunday",ml:"ഞായർ"},1:{en:"Monday",ml:"തിങ്കൾ"},2:{en:"Tuesday",ml:"ചൊവ്വ"},3:{en:"Wednesday",ml:"ബുധൻ"},4:{en:"Thursday",ml:"വ്യാഴം"},5:{en:"Friday",ml:"വെള്ളി"},6:{en:"Saturday",ml:"ശനി"}}}),angular.module("calendarApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="root" ng-controller="MainCtrl"> <div id="year-nav"> <span class="pull-left year-nav"> <a ng-click="previous()"> &lt; {{previousYear}} </a> </span> <a href="#" editable-select="year" data-e-ng-options="s.value as s.text for s in years" title="Click to change the year" buttons="no" class="year-select"> {{ showYear() }} </a> <span class="pull-right year-nav"> <a ng-click="next()"> {{nextYear}} &gt; </a> </span> </div> <div> <ul class="month-nav"> <li ng-repeat="month in calendar.months"> <span class="month-nav-sep" ng-show="$first"> | </span> <a ng-click="scrollTo(\'month-{{month.name}}\')" title="{{month.name}}">{{month.name | limitTo: 3}}</a> <span class="month-nav-sep"> | </span> </li> </ul> </div> <div cg-busy="calendar"></div> <div class="calendar-container"> <div ng-repeat="month in calendar.months" id="{{ \'month-\' + month.name }}" class="calendar-month"> <span ng-show="backToTopVisibility" class="back-to-top"> <a class="scroll-up" ng-click="scrollToTop()" title="Back to the top">Top</a> </span> <div class="clearfix month-masthead"> <div class="pull-left"><span class="month-name">{{month.name}} | {{month.days[0].mlMonth}}</span></div> <div class="pull-right"> <div class="malayalam-year">{{malayalamYears}}</div> <div class="malayalam-month">{{malayalamMonthNames}}</div> </div> </div> <div class="month-year text-center"><h1>{{year}}</h1></div> <month></month> </div> </div> </div>'),a.put("views/month.html",'<table class="calendar"> <colgroup span="7"></colgroup> <tbody> <tr class="head"> <th scope="col" ng-repeat="weekday in weekdaysLookup" title="{{weekday.en}}" ng-class="weekday.en == \'Sunday\' ? \'sunday\' : \'\' "> <div>{{weekday.en | limitTo: 1}}</div> <div class="malayalam-weekday">{{weekday.ml}}</div> </th> </tr> <tr ng-repeat="week in weeks"> <td ng-repeat="day in week"> <div class="day" ng-class="$first ? \'sunday\' : \'\'"> <div class="gregorian">{{day.date}}</div> <div class="malayalam-day">{{day.malayalamDay}}</div> <div class="naksatra">&#160; {{day.naksatra}}</div> </div> </td> </tr> </tbody> </table>')}]);