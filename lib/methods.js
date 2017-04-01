import { Meteor } from 'meteor/meteor';
import { Recipes, Ingredients, Categories, SubCategories, Measures, Difficulties, Users } from '../lib/collections';
 
Meteor.methods({
	addCategory(category) {
		const dbCategory = Categories.findOne({name: category});
		if (!dbCategory) {
			const newCategory = Categories.insert({name: category});
			return newCategory;
		} else {
			return 'exists';
		};
	},
	addSubCategory(subcategory) {
		const dbSubCategory = SubCategories.findOne({name: subcategory});
		if (!dbSubCategory) {
			const newSubCategory = SubCategories.insert({name: subcategory});
			return newSubCategory;
		} else {
			return 'exists';
		};
	},
	addIngredient(ingredient) {
		const dbIngredient = Ingredients.findOne({name: ingredient});
		if (!dbIngredient) {
			const newIngredient = Ingredients.insert({name: ingredient});
			return newIngredient;
		} else {
			return 'exists';
		};
	},
	addMeasure(measure, abbr) {
		const dbMeasure = Measures.findOne({name: measure});
		if(!dbMeasure) {
			const newMeasure = Measures.insert({name: measure, abbr: abbr});
			return newMeasure;
		} else {
			return 'exists';
		};
	},
	addDifficulty(difficulty, stars) {
		const dbDifficulty = Difficulties.findOne({name: difficulty});
		if(!dbDifficulty) {
			const newDifficulty = Difficulties.insert({name: difficulty, rank: stars});
			return newDifficulty;
		} else {
			return 'exists';
		};
	},
	addRecipe(recipe) {
		const dbRecipe = Recipes.findOne({name: recipe.name});
		if(!dbRecipe) {
			const newRecipe = Recipes.insert(recipe);
			return newRecipe;
		} else {
			return 'exists';
		};
	},
	registerUser(username, email, password) {
		const dbUser = Users.findOne({email: email});
		if(!dbUser) {
			const newUser = Users.insert({name: username, email: email, password: password});
			return newUser;
		} else {
			return 'exists';
		};
	},
	loginUser(email, password) {
		const dbUser = Users.findOne({email: email});
		if(dbUser) {
			const dbPassword = dbUser.password;
			if(dbPassword != password) {
				return 'wrongPassword';
			} else {
				return dbUser._id;
			}
		} else {
			return 'noUser';
		};
	}
});