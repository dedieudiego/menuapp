import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Recipes } from '../../../lib/collections';
 
export default class RecipeCtrl extends Controller {
    
    constructor() {
      super(...arguments);
      this.subscribe('recipes');

      this.recipeId = this.$stateParams.id;

      let loggedUser = localStorage.getItem('Meteor.userId');
      if(!loggedUser) {
        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        this.$state.go('login');
      }

      this.helpers({
        data() {
          return Recipes.findOne(this.recipeId);
        }
      })
    }
    
    handleError(err) {
      let thisVar = this;
      if (err.error == 'cancel') return;
      this.$log.error('ERROR', err);
      this.$ionicPopup.alert({
          title: err.reason || 'ERROR',
          template: 'Try again',
          okType: 'button-positive button-clear'
      });
    }
}

RecipeCtrl.$inject = ['$ionicLoading','$ionicPopup', '$ionicHistory', '$state', '$stateParams', '$timeout', '$log'];