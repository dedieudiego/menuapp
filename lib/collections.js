import { Mongo } from 'meteor/mongo';
 
export const Users = new Mongo.Collection('users');
export const Menus = new Mongo.Collection('menus');
export const Recipes = new Mongo.Collection('recipes');
export const Categories = new Mongo.Collection('categories');
export const SubCategories = new Mongo.Collection('subcategories');
export const Measures = new Mongo.Collection('measures');
export const Ingredients = new Mongo.Collection('ingredients');
export const Difficulties = new Mongo.Collection('difficulties');