// main.js

window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	// A9
	return JSON.parse(localStorage.getItem("recipes")) || [];
}

function addRecipesToDocument(recipes) {
	// A10
	let mainEl = document.querySelector("main");

	// A11
	for (let recipe of recipes) {
		let recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipe;
		mainEl.append(recipeCard);
	}
}
function saveRecipesToStorage(recipes) {
	localStorage.setItem("recipes", JSON.stringify(recipes));
}

function initFormHandler() {
	// B2
	let formEl = document.querySelector("form");

	// B3
	formEl.addEventListener("submit", function (event) {
		event.preventDefault();

		// B4
		let formData = new FormData(formEl);

		// B5
		let recipeObject = {};
		for (let [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		recipeObject.rating = Number(recipeObject.rating);
		recipeObject.numRatings = Number(recipeObject.numRatings);

		// B6
		let recipeCard = document.createElement("recipe-card");

		// B7
		recipeCard.data = recipeObject;

		// B8
		document.querySelector("main").append(recipeCard);

		// B9
		let recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		formEl.reset();
	});

	// B10
	let clearButton = document.querySelector("button.danger");

	// B11
	clearButton.addEventListener("click", function () {
		// B12
		localStorage.clear();

		// B13
		document.querySelector("main").innerHTML = "";
	});
}