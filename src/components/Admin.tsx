import React from "react";
import { RouteComponentProps } from "@reach/router";
import ErrorBoundary from "../ErrorBoundary";

import { IListMealsState } from "../types/IListMealsState";
import { IRecipe } from "../types/IRecipe";
import {
  getAllRecipes,
  createNewRecipe,
  deleteRecipe,
  updateRecipe
} from "../api/index";
import AuthContext from "../AuthContext";

// import data from "../data/mock/recipes.json";

type MostProps = RouteComponentProps<any>;

class Admin extends React.Component<MostProps> {
  public state: IListMealsState & any = {
    recipes: [],
    addNewRecipeView: false,
    modifyRecipe: null,
    modifyRecipeId: "",
    modifyRecipeAction: "modify",
    newRecipe: {
      title: "",
      time: "",
      convenience: "",
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      ingredientList: "",
      style: "",
      notes: "",
      score: 0,
      description: ""
    }
  };

  public componentDidMount() {
    this.getAllRecipes();
  }

  public getAllRecipes = () => {
    getAllRecipes().then(recipes => {
      this.setState({ recipes });
    });
  };

  public handleRecipeAction = (e: any) => {
    e.preventDefault();
    if (this.state.modifyRecipeAction === "delete") {
      deleteRecipe(this.state.modifyRecipeId).then(res => {
        this.setState({ modifyRecipeAction: "modify" });
        this.getAllRecipes();
      });
    } else {
      const recipeToUpdate = this.state.recipes.filter((recipe: IRecipe) => {
        return recipe._id === this.state.modifyRecipeId;
      })[0];

      const updatedRecipe = Object.assign(
        {
          title: "",
          time: "",
          convenience: "",
          prepTimeMinutes: 0,
          cookTimeMinutes: 0,
          ingredientList: "",
          style: "",
          notes: "",
          score: 0,
          description: ""
        },
        recipeToUpdate
      );
      this.setState({ modifyRecipe: updatedRecipe });
    }
  };

  public handleRecipeSelectChange = (selectAction: string) => {
    this.setState({
      modifyRecipeAction: selectAction
    });
  };

  public showRecipeOptions = (id: string) => {
    this.setState({ modifyRecipeId: id });
  };

  public renderRecipes = () => {
    if (!this.state.recipes.length) {
      return <p>Looks like you haven't added any recipes yet - get to work!</p>;
    } else {
      const recipeList = this.state.recipes.map((recipe: IRecipe) => {
        let ingredients: JSX.Element[] = [];
        if (recipe.ingredientList) {
          ingredients = recipe.ingredientList.map(ingredient => {
            return <span key={ingredient}>{ingredient}</span>;
          });
        }
        return (
          <div key={recipe.title} className="recipeCard">
            <h4 className="viewTitle">{recipe.title}</h4>
            {this.state.modifyRecipeId === recipe._id ? (
              <form onSubmit={e => this.handleRecipeAction(e)}>
                <select
                  onChange={e => {
                    this.handleRecipeSelectChange(e.currentTarget.value);
                  }}
                >
                  <option value="modify">modify</option>
                  <option value="delete">delete</option>
                </select>
                <button type="submit">submit</button>
              </form>
            ) : (
              <button
                className="adminButton"
                onClick={() => this.showRecipeOptions(recipe._id)}
              >
                options
              </button>
            )}
          </div>
        );
      });
      return recipeList;
    }
  };

  public updateNewForm = (obj: any) => {
    const form = Object.assign(this.state.newRecipe, {
      [`${obj.input}`]: obj.value
    });
    this.setState({ newRecipe: form });
  };

  public updateModifyForm = (obj: any) => {
    const form = Object.assign(this.state.modifyRecipe, {
      [`${obj.input}`]: obj.value
    });
    this.setState({ modifyRecipe: form });
  };

  public showRecipeView = (bool: boolean) => {
    this.setState({
      addNewRecipeView: bool,
      modifyRecipe: null,
      modifyRecipeId: ""
    });
  };

  public validateFields = (state: string) => {
    if (
      !this.state[`${state}`].title ||
      !this.state[`${state}`].time ||
      !this.state[`${state}`].convenience ||
      !this.state[`${state}`].ingredientList ||
      !this.state[`${state}`].style ||
      !this.state[`${state}`].notes
    ) {
      return false;
    } else {
      return true;
    }
  };

  public addNewRecipe = (e: any) => {
    e.preventDefault();
    if (this.validateFields("newRecipe")) {
      const createRecipe = Object.assign({}, this.state.newRecipe);
      createRecipe.ingredientList = createRecipe.ingredientList.split(",");
      createNewRecipe(createRecipe).then(res => {
        this.setState({
          newRecipe: {
            title: "",
            time: "",
            convenience: "",
            prepTimeMinutes: 0,
            cookTimeMinutes: 0,
            ingredientList: "",
            style: "",
            notes: "",
            score: 0,
            description: ""
          }
        });
      });
    }
  };

  public updateRecipe = (e: any) => {
    e.preventDefault();
    if (this.validateFields("modifyRecipe")) {
      const updatedRecipe = Object.assign({}, this.state.modifyRecipe);

      if (!Array.isArray(updatedRecipe.ingredientList)) {
        updatedRecipe.ingredientList = updatedRecipe.ingredientList.split(",");
      }

      updateRecipe(updatedRecipe).then(res => {
        this.setState({
          modifyRecipe: {
            title: "",
            time: "",
            convenience: "",
            prepTimeMinutes: 0,
            cookTimeMinutes: 0,
            ingredientList: "",
            style: "",
            notes: "",
            score: 0,
            description: ""
          }
        });
      });
    } else {
      console.log("validation failed");
    }
  };

  public renderModifyRecipeForm = () => {
    return (
      <form className="recipeForm" onSubmit={e => this.updateRecipe(e)}>
        <label htmlFor="title">recipe title:</label>
        <input
          type="text"
          name="title"
          value={this.state.modifyRecipe.title}
          onChange={e =>
            this.updateModifyForm({ value: e.target.value, input: "title" })
          }
        />
        <label htmlFor="meal">recipe meal:</label>
        <input
          type="text"
          name="time"
          value={this.state.modifyRecipe.time}
          onChange={e =>
            this.updateModifyForm({ value: e.target.value, input: "time" })
          }
        />
        <label htmlFor="convenience">recipe convenience:</label>
        <input
          type="text"
          name="convenience"
          value={this.state.modifyRecipe.convenience}
          onChange={e =>
            this.updateModifyForm({
              value: e.target.value,
              input: "convenience"
            })
          }
        />
        <label htmlFor="style">recipe style:</label>
        <input
          type="text"
          name="style"
          value={this.state.modifyRecipe.style || ""}
          onChange={e =>
            this.updateModifyForm({ value: e.target.value, input: "style" })
          }
        />
        <label htmlFor="prepTimeMinutes">preptime:</label>
        <input
          type="text"
          name="prepTimeMinutes"
          value={this.state.modifyRecipe.prepTimeMinutes || ""}
          onChange={e =>
            this.updateModifyForm({
              value: e.target.value,
              input: "prepTimeMinutes"
            })
          }
        />
        <label htmlFor="cookTimeMinutes">cooktime:</label>
        <input
          type="text"
          name="cookTimeMinutes"
          value={this.state.modifyRecipe.cookTimeMinutes || ""}
          onChange={e =>
            this.updateModifyForm({
              value: e.target.value,
              input: "cookTimeMinutes"
            })
          }
        />
        <label htmlFor="ingredients">
          recipe ingredients (comma separated):
        </label>
        <input
          type="text"
          name="ingredients"
          value={this.state.modifyRecipe.ingredientList || ""}
          onChange={e =>
            this.updateModifyForm({
              value: e.target.value,
              input: "ingredientList"
            })
          }
        />
        <label htmlFor="notes">recipe notes:</label>
        <input
          type="text"
          name="notes"
          value={this.state.modifyRecipe.notes || ""}
          onChange={e =>
            this.updateModifyForm({ value: e.target.value, input: "notes" })
          }
        />
        <label htmlFor="description">recipe description:</label>
        <input
          type="text"
          name="description"
          value={this.state.modifyRecipe.description || ""}
          onChange={e =>
            this.updateModifyForm({
              value: e.target.value,
              input: "description"
            })
          }
        />
        <button className="adminFormButton" type="submit">
          update
        </button>
      </form>
    );
  };

  public renderAddRecipeForm = () => {
    return (
      <form className="recipeForm" onSubmit={e => this.addNewRecipe(e)}>
        <label htmlFor="title">recipe title:</label>
        <input
          type="text"
          name="title"
          value={this.state.newRecipe.title}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "title" })
          }
        />
        <label htmlFor="meal">recipe meal:</label>
        <input
          type="text"
          name="time"
          value={this.state.newRecipe.time}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "time" })
          }
        />
        <label htmlFor="convenience">recipe convenience:</label>
        <input
          type="text"
          name="convenience"
          value={this.state.newRecipe.convenience}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "convenience" })
          }
        />
        <label htmlFor="style">recipe style:</label>
        <input
          type="text"
          name="style"
          value={this.state.newRecipe.style}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "style" })
          }
        />
        <label htmlFor="ingredients">
          recipe ingredients (comma separated):
        </label>
        <input
          type="text"
          name="ingredients"
          value={this.state.newRecipe.ingredientList}
          onChange={e =>
            this.updateNewForm({
              value: e.target.value,
              input: "ingredientList"
            })
          }
        />
        <label htmlFor="notes">recipe notes:</label>
        <input
          type="text"
          name="notes"
          value={this.state.newRecipe.notes}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "notes" })
          }
        />
        <label htmlFor="description">recipe description:</label>
        <input
          type="text"
          name="description"
          value={this.state.newRecipe.description}
          onChange={e =>
            this.updateNewForm({ value: e.target.value, input: "description" })
          }
        />
        <button className="adminFormButton" type="submit">
          create
        </button>
      </form>
    );
  };

  public renderViews = () => {
    if (this.state.addNewRecipeView) {
      return (
        <div className="adminForm">
          {this.renderAddRecipeForm()}
          <button
            className="adminFormButton"
            onClick={() => this.showRecipeView(false)}
          >
            back
          </button>
        </div>
      );
    } else if (this.state.modifyRecipe && this.state.modifyRecipeId) {
      return (
        <div className="adminForm">
          {this.renderModifyRecipeForm()}
          <button
            className="adminFormButton"
            onClick={() => this.showRecipeView(false)}
          >
            back
          </button>
        </div>
      );
    } else {
      return <div className="listAllMeals">{this.renderRecipes()}</div>;
    }
  };

  public render() {
    return (
      <div className="results admin">
        <div className="adminActions">
          {!this.state.addNewRecipeView ? (
            <button
              className="adminAction"
              onClick={() => this.showRecipeView(true)}
            >
              add new recipe
            </button>
          ) : null}
        </div>
        {this.renderViews()}
      </div>
    );
  }
}

Admin.contextType = AuthContext;

export default function DetailsErrorBoundary(props: any) {
  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
}
