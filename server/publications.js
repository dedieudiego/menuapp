import { Meteor } from 'meteor/meteor';
import { Recipes, Categories, SubCategories, Ingredients, Measures, Difficulties, Users, Menus } from '../lib/collections';
 
Meteor.publishComposite('users', function() {
  return {
    find() {
      return Users.find();
    }
  };
});

Meteor.publishComposite('menus', function() {
  return {
    find() {
      return Menus.find();
    }
  };
});

Meteor.publishComposite('recipes', function() {
  return {
    find() {
      return Recipes.find();
    }
  };
});

Meteor.publishComposite('categories', function() {
  return {
    find() {
      return Categories.find();
    }
  };
});

Meteor.publishComposite('subcategories', function() {
  return {
    find() {
      return SubCategories.find();
    }
  };
});

Meteor.publishComposite('ingredients', function() {
  return {
    find() {
      return Ingredients.find();
    }
  };
});

Meteor.publishComposite('measures', function() {
  return {
    find() {
      return Measures.find();
    }
  };
});

Meteor.publishComposite('difficulties', function() {
  return {
    find() {
      return Difficulties.find();
    }
  };
});