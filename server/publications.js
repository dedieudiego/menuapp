import { Meteor } from 'meteor/meteor';
import { Recipes, Categories, SubCategories, Ingredients, Measures, Difficulties, Menus } from '../lib/collections';

Meteor.publish('users', function() {
  return Meteor.users.find({}, { fields: { profile: 1, notFirstTime: 1 } });
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