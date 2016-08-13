# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Custom & External Angular Directives

<!--1:00 5 minutes -->

<!--Hook: Raise your hand if you find the process of communicating between your HTML and JS frustrating.  For those who raised their hands, today we will share a couple ways to make your life easier.  And for those who didn't, I believe we will make that communication even tighter.  Today, we will be talking about directives and... -->

Directives are snippets of HTML with their own custom JavaScript logic. Angular's concept of directives helps separate concerns and duties of code while making your views DRY and logic-less. Angular directives are very modular and can be added, shared, and swapped between projects.

### What are the objectives?
<!-- specific/measurable goal for students to achieve -->
*After this workshop, developers will be able to:*

* **Understand** the purpose and function of Angular directives
* **Find** the correct directive for a web app's needs
* **Create** a simple custom directive

### Where should we be now?
<!-- call out the skills that are prerequisites -->
*Before this workshop, developers should already be able to:*

* **Implement** an Angular app with a single page and single controller

<!--1:05 15 minutes -->

## Angular's Built-in Directives (Warm-up)

Check out the [AngularJS API Docs](https://docs.angularjs.org/api) to implement a simple app.

* Begin with your intro project or create a new one
* Work in pairs to implement as many of the following directives as possible:  ngClick, ngIf, ngHide, ngShow, ngModel

<!--1:20 15 minutes -->

## Adding an External Directive

Sometimes when you're looking to solve a problem, you find that another developer has already made a solution in the form of a directive. Now the challenge is how to include that directive in your project.

1. Add the directive's file(s) to your project.
2. Include the file(s) in `index.html`.
3. Inject the directive into your app:

  ```js
  // app.js

  angular.module('yourApp', ['ngResource', 'ngMap', 'pickadate', 'ui.bootstrap']);
  ```

Check out <a href="http://ngmodules.org" target="_blank">ng-modules</a> to find popular Angular Directives to add to your project.  Choose two to add with your partner.

<!-- Have developers focus on adding just one first, and if they have time, add the second.  -->

<!--1:35 40 minutes -->

## Making Your Own Directive - DEMO

### A Current Weather Example

Imagine you wanted to make a box that displayed a city's current weather that was re-useable across pages for various cities. A directive would be a great solution! Let's look at how you'd build this directive that fetches a city's weather data and displays it on the page.

<!-- Half-mast. Show these quickly, then jump to explanations below.  Finally come back and ask students to copy into their app. -->

Place this HTML anywhere inside your Angular controller:

```html
<!-- index.html -->

<current-weather city="Denver"></current-weather>
```

Add this directive to your app _(NOTE: We will cover a lot of this, such as $scope and $http, in a later lesson)_:

```js
// app.js
var app = angular.module('ngCustomDirectives', []);

app.directive('currentWeather', function() {
  return {
    restrict: 'E',
    scope: {
      city: '@'
    },
    template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
    // templateUrl: 'templates/currentWeatherTemplate.html',
    // transclude: true,
    controller: ['$scope', '$http', function($scope, $http){
                var url="http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
                var apikey = "&appid="; // go generate an API key and plug it in here.
                $scope.getWeather = function(city){
                    $http({method: 'JSONP', url: url + city + apikey})
                        .success(function(data){
                            $scope.weather = data;
                        });
                };
            }],
    link: function (scope, element, attrs) {
      scope.weather = scope.getWeather(attrs.city);
    }
  };
});
```

## Angular Directive Options

#### Restrict

The first option in an Angular directive is the `restrict` option. This option lets you specify how exactly you'd like to call the directive in HTML. See the options below; A and E are the most popular.

```html
'A' - <span current-weather></span>
'E' - <current-weather></current-weather>
'C' - <span class="current-weather"></span>
'M' - <!-- directive: current-weather -->
```

#### template and templateUrl

Using the `template` and `templateUrl` options you can define an HTML template inside the directive's JS or in a separate HTML file in the templates folder.

#### Scope inside a Directive

But wait a sec, how do directives interact with the `$scope` set by the local controller? Can I get data from the local controller into my directive?

By default, scopes do inherit the scope of their local controller just like they were HTML in the template. However, you can use the `scope` option to change this default behavior to isolate your directive's scope.

1. `scope: true` - If scope is set to `true`, then the directive will have its own child scope that inherits from the parent scope of the local controller, meaning it can still access and change the parent scope.

2. `scope: {}` - By passing an object to the `scope` option, you can define an **isolated scope**. Inside this object you can pass in three **aliases** indicating the expected datatype:

  ```js
  scope: {
    ngModel: '=',     // provides two-way binding
    onSend: '&',      // works with function calls
    fromName: '@'     // reads attribute value
  }
  ```

  ```html
  <input type="text" ng-model="recipient.email">
  <!-- invoke the directive -->
  <div scope-example ng-model="recipient.email" on-send="sendMail()" from-name="ari@fullstack.io">
  ```

#### controller and link

The controller option allows you to define a controller specific and isolated to the directive.

The `link()` option is the meat and potatoes of the directive. Inside this function, you specify what you'd like the directive to do, and you can update scope.

### Challenge:

Add this new custom directive to your app.  Make sure you get an API key for the weather API.  Once everything works, make it beautiful and see what other information you could include on your dynamic app.

#### Question:
* How would you show the weather for multiple cities?

### Further Resources

* [ng-newsletter Blog Post on Directives](http://www.ng-newsletter.com/posts/directives.html)
* [Explaining Scope Symbols in Directives](http://stackoverflow.com/questions/21712147/angularjs-differences-among-in-directive-scope)

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
