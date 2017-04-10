// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';

import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';
 
// Modules
import UsersCtrl from './controllers/users.controller';
import UserCtrl from './controllers/user.controller';
import AdminCtrl from './controllers/admin.controller';
import RecipesCtrl from './controllers/recipes.controller';
import RecipeCtrl from './controllers/recipe.controller';
import MenuCtrl from './controllers/menu.controller';
import InputDirective from './directives/input.directive';
import RoutesConfig from './routes';
 
const App = 'Menú App';
 
// App
Angular.module(App, [
  'angular-meteor',
  'ionic',
  'accounts.ui'
]);

new Loader(App)
  .load(AdminCtrl)
  .load(UsersCtrl)
  .load(UserCtrl)
  .load(RecipesCtrl)
  .load(RecipeCtrl)
  .load(MenuCtrl)
  .load(InputDirective)
  .load(RoutesConfig);
 
// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}
 
function onReady() {
  Angular.bootstrap(document, [App]);
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}