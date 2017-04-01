import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Session } from 'meteor/session';
import { Ingredients, Measures, Categories, SubCategories, Difficulties } from '../../../lib/collections';
 
export default class AdminCtrl extends Controller {
    
    constructor() {
        super(...arguments);
        this.subscribe('categories');
        this.subscribe('subcategories');
        this.subscribe('ingredients');
        this.subscribe('measures');
        this.subscribe('difficulties');
        const thisVar = this;

        $('#fileInput').change(function(evt){
          if(evt.target.files[0].type == 'image/jpeg' || evt.target.files[0].type == 'image/pjpeg' || evt.target.files[0].type == 'image/jpg' || evt.target.files[0].type == 'image/png') {
            thisVar.recipeImage = evt.target.files[0];
          } else {
            thisVar.handleError({reason: 'File extension not supported'});
            this.value = '';
          };
        });
        const adminLogged = Session.get('adminLogged');

        if(!adminLogged) {
          this.$ionicPopup.prompt({
            title: 'Password Check',
            template: 'Enter the admin password',
            inputType: 'password',
            inputPlaceholder: 'Admin password'
          }).then(function(res) {
            if(res != 1234) {
              thisVar.$state.go('login');
            } else {
              Session.set('adminLogged', true);
            };
          });
        };

        $(document).on('click', '.removeIngredient', function(e){
          $(e.target).parent().remove();
        });

        $(document).on('click', '.removeStep', function(e){
          $(e.target).parent().remove();
        });

        this.helpers({
          categories() {
            return Categories.find();
          },
          subcategories() {
            return SubCategories.find();
          },
          ingredients() {
            return Ingredients.find();
          },
          measures() {
            return Measures.find();
          },
          difficulties() {
            return Difficulties.find();
          }
        })
    }

    addCategory() {
      const thisVar = this;
      this.callMethod('addCategory', this.category, (err, data) => {
        if (err) return this.handleError(err);

        if (data == 'exists') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Method failed',
                template: 'This category already exists in DB',
                okType: 'button-positive button-clear'
            });
          }, 100);
        } else {
          this.category = '';
        };
      })
    }

    addSubCategory() {
      const thisVar = this;
      this.callMethod('addSubCategory', this.subcategory, (err, data) => {
        if (err) return this.handleError(err);

        if (data == 'exists') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Method failed',
                template: 'This category already exists in DB',
                okType: 'button-positive button-clear'
            });
          }, 100);
        } else {
          this.subcategory = '';
        };
      })
    }

    addIngredient() {
      const thisVar = this;
      this.callMethod('addIngredient', this.ingredient, (err, data) => {
        if (err) return this.handleError(err);

        if (data == 'exists') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Method failed',
                template: 'This ingredient already exists in DB',
                okType: 'button-positive button-clear'
            });
          }, 100);
        } else {
          this.ingredient = '';
        };
      })
    }

    addMeasure() {
      const thisVar = this;
      this.callMethod('addMeasure', this.measure, this.measureAbbr, (err, data) => {
        if (err) return this.handleError(err);

        if (data == 'exists') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Method failed',
                template: 'This measure already exists in DB',
                okType: 'button-positive button-clear'
            });
          }, 100);
        } else {
          this.measure = '';
          this.measureAbbr = '';
        };
      })
    }

    addDifficulty() {
      const thisVar = this;
      this.callMethod('addDifficulty', this.difficulty, this.difficultyStars, (err, data) => {
        if (err) return this.handleError(err);

        if (data == 'exists') {
          this.$timeout(function(){
            thisVar.$ionicPopup.alert({
                title: 'Method failed',
                template: 'This difficulty already exists in DB',
                okType: 'button-positive button-clear'
            });
          }, 100);
        } else {
          this.difficulty = '';
          this.difficultyStars = '';
        };
      })
    }

    addRecipe() {
      const thisVar = this;

      let ingredients = $('.newIngredient');
      let recipeIngredients = [];
      $.each(ingredients, function(index, ingredient) {
        const qty = $(ingredient).find('input').val();
        const ing = $(ingredient).find('select[name=ingredientSelect] option:selected').text();
        const measure = $(ingredient).find('select[name=measureSelect] option:selected').text();
        const recipeIngredient = {qty: qty, ingredient: ing, measure: measure};
        recipeIngredients.push(recipeIngredient);
      });

      let steps = $('.newStep');
      let recipeSteps = [];
      $.each(steps, function(index, stp) {
        const step = $(stp).find('textarea').val();
        const recipeStep = {text: step};
        recipeSteps.push(recipeStep);
      });

      let reader = new FileReader();
      reader.readAsDataURL(this.recipeImage);
      reader.onload = function () {
        let recipeImage64 = reader.result;

        const recipe = {
          category: thisVar.recipeCategory.name,
          subcategory: thisVar.recipeSubCategory.name,
          name: thisVar.recipeName,
          subtitle: thisVar.recipeSubtitle,
          image: recipeImage64,
          steps: recipeSteps,
          ingredients: recipeIngredients,
          time: thisVar.recipeTime,
          difficulty: thisVar.recipeDifficulty.name,
          eaters: thisVar.recipeEaters
        };

        thisVar.callMethod('addRecipe', recipe, (err, data) => {
          if (err) return thisVar.handleError(err);

          if (data == 'exists') {
            thisVar.$timeout(function(){
              thisVar.$ionicPopup.alert({
                  title: 'Method failed',
                  template: 'This difficulty already exists in DB',
                  okType: 'button-positive button-clear'
              });
            }, 100);
          } else {
            thisVar.recipeCategory = '';
            thisVar.recipeSubCategory = '';
            thisVar.recipeName = '';
            thisVar.recipeSubtitle = '';
            thisVar.recipeImage = '';
            thisVar.recipeTime = '';
            thisVar.recipeDifficulty = '';
            thisVar.recipeEaters = '';
            $('#fileInput')[0].value = '';
          };
        })
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
        thisVar.handleError(error);
        return false;
      };
    }

    addIngredients() {
      let fields = '<label class="item item-input"> <input ng-model="admin.recipeIngredientQty" type="number" placeholder="Cantidad" class="ng-pristine ng-untouched ng-valid ng-empty" style=""> </label> <label for="ingredientSelect" class="item item-input item-select"> Ingrediente <select name="ingredientSelect" ng-model="admin.recipeIngredient" ng-options="ingredient.name for ingredient in admin.ingredients" class="ng-pristine ng-untouched ng-valid ng-empty" style=""><option value="" selected="selected">Seleccionar ingrediente</option><option label="Sal" value="object:19">Sal</option><option label="Pollo" value="object:20">Pollo</option><option label="Papa" value="object:21">Papa</option><option label="Huevos" value="object:22">Huevos</option><option label="Carne" value="object:23">Carne</option><option label="Pan rallado" value="object:24">Pan rallado</option><option label="Aceite" value="object:25">Aceite</option><option label="Queso" value="object:26">Queso</option><option label="Jamon" value="object:27">Jamon</option></select> </label> <label for="measureSelect" class="item item-input item-select"> Medida <select name="measureSelect" ng-model="admin.recipeMeasure" ng-options="measure.name for measure in admin.measures" class="ng-pristine ng-untouched ng-valid ng-empty" style=""><option value="" selected="selected">Seleccionar medida</option><option label="Cucharadas" value="object:28">Cucharadas</option><option label="Cucharaditas" value="object:29">Cucharaditas</option><option label="Unidades" value="object:30">Unidades</option><option label="Gramos" value="object:31">Gramos</option><option label="Kilos" value="object:32">Kilos</option><option label="Mililitros" value="object:33">Mililitros</option><option label="Litros" value="object:34">Litros</option></select> </label> <button class="button button-block button-assertive removeIngredient">ELIMINAR</button>'
      $('#moreIngredients').before('<div class="newIngredient">'+fields+'</div>');
    }

    addSteps() {
      let fields = '<label class="item item-input"> <textarea ng-model="admin.recipeSteps" class="ng-untouched ng-valid ng-not-empty ng-dirty ng-valid-parse" style=""></textarea> </label> <button class="button button-block button-assertive removeStep">ELIMINAR</button>'
      $('#moreSteps').before('<div class="newStep">'+fields+'</div>');
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

AdminCtrl.$inject = ['$ionicLoading','$ionicPopup', '$timeout', '$state', '$log'];