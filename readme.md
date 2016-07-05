# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Custom & External Angular Directives

Directives are snippets of HTML with their own custom JavaScript logic. Angular's concept of directives helps separate concerns and duties of code while making your views DRY and logic-less. Angular directives are very modular and can be added, shared, and swapped between projects.

## Adding an External Directive

Sometimes when you're looking to solve a problem, you find that another developer has already made a solution in the form of a directive. Now the challenge is how to include that directive in your project.

1. Add the directive's file(s) to your project.
2. Include the file(s) in `index.html`.
3. Inject the directive into your app:

  ```js
  // app.js

  angular.module('yourApp', ['ngResource', 'ngMap', 'pickadate', 'ui.bootstrap']);
  ```

Check out <a href="http://ngmodules.org" target="_blank">ng-modules</a> to find popular Angular Directives to add to your projects.


## Making Your Own Directive - DEMO

### A Current Weather Example

**Catch Up** by putting these code samples into an Angular project.

> Reference: <a href="http://www.ng-newsletter.com/posts/directives.html" target="_blank">ng-newsletter blog post on directives</a>

Imagine you wanted to make a box that displayed a city's current weather that was re-useable across pages for various cities. A directive would be a great solution! Let's look at how you'd build this directive that fetches a city's weather data and displays it on the page.

Place this HTML anywhere inside your Angular controller:

```html
<!-- index.html -->

<current-weather city="San Francisco"></current-weather>
```

Add this directive to your app _(NOTE: We will cover a lot of this, such as $scope and $http, in a later lesson)_:

```js
// app.js
angular.module('yourApp', []);

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
                }
            }],
    link: function (scope, element, attrs) {
      scope.weather = scope.getWeather(attrs.city);
    }
  }
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

#### Question:
How would you show the weather for multiple cities?


