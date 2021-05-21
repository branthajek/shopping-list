import { Ingredient } from "../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 4),
    ]
}

export function shoppingListReducer(state = initialState, action) {

}