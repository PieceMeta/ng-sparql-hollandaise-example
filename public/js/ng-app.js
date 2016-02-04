/* global angular,SPH,SPH_ENDPOINT,SPH_DEFAULT_PREFIXES */
(function () {
    'use strict';

    angular.module('ngsparql.example.services', [])
        .factory('queryService', function () {
            return {
                createQuery: function () {
                    return new SPH.Query(SPH_ENDPOINT).prefix(SPH_DEFAULT_PREFIXES);
                }
            }
        });

    angular.module('ngsparql.example.controllers', [
            'ngsparql.example.services'
        ])
        .controller('Site.Start', ['$scope', '$q', 'queryService', function ($scope, $q, queryService) {

            //
            //
            // construct a graph pattern from triples

            var pattern = new SPH.GraphPattern([
                    '?piece a pbao:Piece',
                    '?piece rdfs:label ?piece_label',
                    '?piece dct:created ?date'
                ]);

            //
            //
            // add a filter to the pattern

            pattern.addElement(new SPH.Filter('langMatches( lang(?piece_label), "de" )'));

            var group = new SPH.GroupGraphPattern(pattern);

            var query = queryService.createQuery()
                .select('*')
                .where(group)
                .order('?piece_label')
                .limit(10)
                .offset(5);

            // get the query string
            $scope.query = query.toString();

            // execute and bind the results to the scope. w00t!

            query.exec().then(function (results) {
                console.log(results);
                $scope.results = results;
                $scope.$apply();
            });

        }]);

    angular.module('ngsparql.example.app', [
            'ngRoute',
            'ngsparql.example.controllers'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when('/', { templateUrl: '/screens/start', controller: 'Site.Start' });
            //$routeProvider.otherwise({ redirectTo: '/' });
        }]);

}());