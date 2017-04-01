import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Recipes, SubCategories } from '../../../lib/collections';
 
export default class RecipesCtrl extends Controller {
    
    constructor() {
      super(...arguments);
      this.subscribe('recipes');
      this.subscribe('subcategories');
      this.menuSubcategory = "all";

      let loggedUser = localStorage.getItem('loggedUser');
      if(!loggedUser) {
        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        this.$state.go('login');
      }

      this.helpers({
        recipes() {
          return Recipes.find();
        },
        subcategories() {
          return SubCategories.find();
        }
      })
    }
    
    generateMenu() {
      const thisVar = this;
      let days = [];
      if (this.monday) { days.push('lunes'); }; 
      if (this.tuesday) { days.push('martes'); }; 
      if (this.wednesday) { days.push('miércoles'); }; 
      if (this.thursday) { days.push('jueves'); }; 
      if (this.friday) { days.push('viernes'); }; 
      if (this.saturday) { days.push('sabado'); };
      if (this.sunday) { days.push('domingo'); };
      if (days.length == 0) {
        this.$timeout(function(){
          thisVar.$ionicPopup.alert({
              title: 'Generar fallo',
              template: 'Debes seleccionar al menos un dia',
              okType: 'button-positive button-clear'
          });
        }, 100);
        return false;
      };
      if (!this.people) {
        this.$timeout(function(){
          thisVar.$ionicPopup.alert({
              title: 'Generar falló',
              template: 'Debes indicar la cantidad de comensales',
              okType: 'button-positive button-clear'
          });
        }, 100);
        return false;
      };
      Session.set('menuDays', days);
      Session.set('menuPeople', this.people);
      if (this.menuSubcategory) {
        Session.set('menuSubcategory', this.menuSubcategory);
      };
      this.$state.go('menu');
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

RecipesCtrl.$inject = ['$ionicLoading','$ionicPopup', '$ionicHistory', '$state', '$timeout', '$log'];