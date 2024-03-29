import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducer";
import { Recipe } from "../recipes.model";
import * as RecipeActions from "./recipe.actions";

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://shopping-list-eb81d-default-rtdb.firebaseio.com/recipes.json'
            )
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })
    );
    
    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put('https://shopping-list-eb81d-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
        })
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}