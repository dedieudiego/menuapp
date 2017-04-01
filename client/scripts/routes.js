import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
 
class RoutesConfig extends Config {
  constructor() {
    super(...arguments);
 
    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }
  configure() {
    this.$locationProvider.html5Mode(true);
    this.$locationProvider.hashPrefix('');
    this.$stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'client/templates/admin.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-category', {
        url: '/add-category',
        templateUrl: 'client/templates/add-category.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-subcategory', {
        url: '/add-subcategory',
        templateUrl: 'client/templates/add-subcategory.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-ingredient', {
        url: '/add-ingredient',
        templateUrl: 'client/templates/add-ingredient.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-measure', {
        url: '/add-measure',
        templateUrl: 'client/templates/add-measure.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-difficulty', {
        url: '/add-difficulty',
        templateUrl: 'client/templates/add-difficulty.html',
        controller: 'AdminCtrl as admin'
      })
      .state('add-recipe', {
        url: '/add-recipe',
        templateUrl: 'client/templates/add-recipe.html',
        controller: 'AdminCtrl as admin'
      })
      .state('recipes', {
        url: '/recipes',
        templateUrl: 'client/templates/recipes.html',
        controller: 'RecipesCtrl as recipes'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'client/templates/register.html',
        controller: 'UsersCtrl as user'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/templates/login.html',
        controller: 'UsersCtrl as user'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'client/templates/home.html',
        controller: 'RecipesCtrl as recipes'
      })
      .state('menu', {
        url: '/menu',
        templateUrl: 'client/templates/menu.html',
        controller: 'MenuCtrl as menu'
      })
      .state('recipe', {
        url: '/recipe/:id',
        templateUrl: 'client/templates/recipe.html',
        controller: 'RecipeCtrl as recipe'
      })
 
    this.$urlRouterProvider.otherwise('login');
  }
  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
 
class RoutesRunner extends Runner {
  run() {
    let thisVar = this;
  }
}
 
RoutesRunner.$inject = ['$rootScope', '$state'];
 
export default [RoutesConfig, RoutesRunner];
