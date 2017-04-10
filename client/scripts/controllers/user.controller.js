import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Users } from '../../../lib/collections';
 
export default class UserCtrl extends Controller {
    
    constructor() {
      super(...arguments);
      this.subscribe('users');
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

UserCtrl.$inject = ['$ionicLoading','$ionicPopup', '$ionicHistory', '$timeout', '$log', '$state'];