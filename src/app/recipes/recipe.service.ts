import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[]= [
    //     new Recipe('Kadhai Paneer', 
    //                 'Kadai Paneer is a vibrant, tangy, deeply spiced paneer recipe that is perfect for enjoying all year round. This restaurant style Kadai Paneer gets its unique flavor from freshly ground spices like coriander and red chilies! Enjoy it with naan or paratha.', 
    //                 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
    //                 [
    //                     new Ingredient('Paneer', 3),
    //                     new Ingredient('Onion', 5),
    //                     new Ingredient('Tomatoes', 1)
    //                 ]),
    //     new Recipe('Chole Bhature',
    //                 'Chole Bhature also known as Chana Bhatura is one of the most popular Punjabi dish liked almost all over India. Chola Bhatura always make for a delicious and filling meal.',
    //                 'https://img.buzzfeed.com/buzzfeed-static/static/2013-11/enhanced/webdr05/18/17/enhanced-buzz-orig-7491-1384813081-10.jpg',
    //                 [
    //                     new Ingredient('Chana',1),
    //                     new Ingredient('Tomatoes', 1),
    //                     new Ingredient('Onion', 5)
    //                 ])
    
    // ];

    private recipes: Recipe[] = [];
    
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addingIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}