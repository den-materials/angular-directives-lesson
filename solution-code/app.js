angular.module('newApp', [])
    .directive('currentWeather', function(){
        return {
            restrict: 'E',
            scope: {
                city: '@'
            },
            template: '<div class="current-weather"><h4>Weather for {{ city }}</h4>{{weather.main.temp}} degrees farenheit</div>',
            controller: ['$scope', '$http', function($scope, $http){
                var url="http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
                var apikey = "&appid=44d52dfe2dfd9e96e7fd20d53e579dd2";
                $scope.getWeather = function(city){
                    $http({method: 'JSONP', url: url + city + apikey})
                        .success(function(data){
                            $scope.weather = data;
                        });
                }
            }],
            link: function(scope, element, attrs){
                scope.weather = scope.getWeather(attrs.city);
            }
        }
    })

