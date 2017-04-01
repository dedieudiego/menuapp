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
 
// Modules
import UsersCtrl from './controllers/users.controller';
import AdminCtrl from './controllers/admin.controller';
import RecipesCtrl from './controllers/recipes.controller';
import InputDirective from './directives/input.directive';
import RoutesConfig from './routes';
 
const App = 'Menú App';
 
// App
Angular.module(App, [
  'angular-meteor',
  'ionic'
]);

new Loader(App)
  .load(AdminCtrl)
  .load(UsersCtrl)
  .load(RecipesCtrl)
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
}