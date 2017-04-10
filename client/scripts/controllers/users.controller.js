import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Users } from '../../../lib/collections';
 
export default class UsersCtrl extends Controller {
    
    constructor() {
      super(...arguments);
      this.subscribe('users');

      let loggedUser = localStorage.getItem('Meteor.userId');
      if(loggedUser) {
        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        this.$state.go('home');
      };

      this.autorun(function() {
        if (!Meteor.userId()) return;

        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        this.$state.go('home');
      })
    }

    goRegister() {
      this.$state.go('register');
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

UsersCtrl.$inject = ['$ionicLoading','$ionicPopup', '$ionicHistory', '$timeout', '$log', '$state'];