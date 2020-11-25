import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Vegan Tacos 1',
      'All vegan recipe for homemade tacos.',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1472483520-springtacos-1572537127.jpg?crop=1.00xw:0.672xh;0,0.156xh&resize=640:*',
      [new Ingredient('Tortillas', 4), new Ingredient('soy curls', 1)]
    ),
    new Recipe(
      'Vegan Tacos 2',
      'Also vegan tacos.',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1472483520-springtacos-1572537127.jpg?crop=1.00xw:0.672xh;0,0.156xh&resize=640:*',
      [new Ingredient('Bell Pepper', 1), new Ingredient('Onion', 1)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
