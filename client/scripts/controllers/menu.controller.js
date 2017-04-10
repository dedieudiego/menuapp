import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Recipes, Categories } from '../../../lib/collections';
 
export default class MenuCtrl extends Controller {
    
  constructor() {
    super(...arguments);
    const subs2 = this.subscribe('recipes');
    const subs = this.subscribe('categories');

    const thisVar = this;
    let loggedUser = localStorage.getItem('Meteor.userId');
    this.days = Session.get('menuDays');
    this.subCategory = Session.get('menuSubcategory');
    this.people = Session.get('menuPeople');
    this.recipes = [];
    if(!loggedUser) {
      this.$ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      this.$state.go('login');
    };
    if(!this.days) {
      this.$ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      this.$state.go('home');
    };
    this.autorun(function() {
      if(!subs.ready() || !subs2.ready()) return false;

      const categories = Categories.find().fetch();
      categories.sort(function() { return 0.5 - Math.random() })
      for (let i = 0, days = this.days.length; i < days; i++) {
        let thisCategory = categories[i];
        if(!thisCategory) {
          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          };
          let x = getRandomInt(0, days);
          thisCategory = categories[x];
        };
        let recipes;
        if(thisVar.subCategory == 'all') {
          recipes = Recipes.find({category: thisCategory.name});
        } else {
          recipes = Recipes.find({ $and: [ { category: { $eq: thisCategory.name } }, { subcategory: { $eq: thisVar.subCategory } } ] });
        };
        recipes = recipes.fetch().sort(function() { return 0.5 - Math.random() });
        recipes[0].day = thisVar.days[i];
        thisVar.recipes.push(recipes[0]);
      }
    });
  }

  saveMenu() {
    let menu = [];
    const loggedUser = localStorage.getItem('loggedUser');
    $.each(this.recipes, function(index, recipe){
      delete recipe.$$hashKey;
      menu.push({recipeId: recipe._id, day: recipe.day});
    })
    this.callMethod('saveMenu', menu, loggedUser, (err) => {
      if(err) return this.handleError(err);
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

MenuCtrl.$inject = ['$ionicLoading','$ionicPopup', '$ionicHistory', '$state', '$timeout', '$log'];