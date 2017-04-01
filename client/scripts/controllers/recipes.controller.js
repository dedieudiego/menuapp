import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Recipes } from '../../../lib/collections';
 
export default class RecipesCtrl extends Controller {
    
    constructor() {
        super(...arguments);
        this.subscribe('recipes');

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
          }
        })
    }
    
    generateMenu() {
      let days = [];
      if (this.monday) { days.push('lunes'); }; 
      if (this.tuesday) { days.push('martes'); }; 
      if (this.wednesday) { days.push('miércoles'); }; 
      if (this.thursday) { days.push('jueves'); }; 
      if (this.friday) { days.push('viernes'); }; 
      if (this.saturday) { days.push('sabado'); };
      if (this.sunday) { days.push('domingo'); };
      console.log(days, this.people);
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