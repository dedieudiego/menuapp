import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Users } from '../../../lib/collections';
 
export default class UsersCtrl extends Controller {
    
    constructor() {
      super(...arguments);
      this.subscribe('users');

      let loggedUser = localStorage.getItem('loggedUser');
      if(loggedUser) {
        this.$ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        this.$state.go('home');
      };
    }

    goRegister() {
      this.$state.go('register');
    }

    register() {
      const thisVar = this;
      if(!this.username || !this.email || !this.password) {
        this.$ionicPopup.alert({
          title: 'Fallo el registro',
          template: 'Por favor complete todos los campos',
          okType: 'button-positive button-clear'
        });
        return false;
      } else if(this.password != this.confirmPassword) {
        this.$ionicPopup.alert({
          title: 'Fallo el registro',
          template: 'Los passwords no son iguales',
          okType: 'button-positive button-clear'
        });
        return false;
      } else {
        this.callMethod('registerUser', this.username, this.email, this.password, (err, data) => {
          if (err) return this.handleError(err);

          if (data == 'exists') {
            this.$timeout(function(){
              thisVar.$ionicPopup.alert({
                  title: 'Registro fallido',
                  template: 'Este email ya se encuentra registrado',
                  okType: 'button-positive button-clear'
              });
            }, 100);
          } else {
            localStorage.setItem('loggedUser', data);
            this.$ionicHistory.nextViewOptions({
              disableBack: true
            });
            this.$state.go('home');
          };
        })
      }
    }

    login() {
      const thisVar = this;
      if(!this.logEmail || !this.logPassword) {
        this.$ionicPopup.alert({
          title: 'Fallo el login',
          template: 'Por favor complete todos los campos',
          okType: 'button-positive button-clear'
        });
        return false;
      };
      this.callMethod('loginUser', this.logEmail, this.logPassword, (err, data) => {
        if(err) return this.handleError(err);

        if (data == 'noUser') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Login fallido',
                template: 'No existe el usuario',
                okType: 'button-positive button-clear'
            });
          }, 100);
          return false;
        } else if (data == 'wrongPassword') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Login fallido',
                template: 'Contraseña incorrecta',
                okType: 'button-positive button-clear'
            });
          }, 100);
          return false;
        } else {
          this.$ionicHistory.nextViewOptions({
            disableBack: true
          });
          localStorage.setItem('loggedUser', data);
          this.$state.go('home');
        };
      });
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