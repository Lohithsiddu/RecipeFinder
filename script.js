// Spoonacular API details
const apiKey = "8ba04bb218ad4ba6a40a438106098e4e"; // Replace with your API key
const apiURL = "https://api.spoonacular.com/recipes/complexSearch";

document.getElementById("searchButton").addEventListener("click", () => {
    const ingredient = document.getElementById("ingredient").value.trim();

    if (ingredient) {
        fetch(`${apiURL}?query=${ingredient}&apiKey=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                displayRecipes(data.results);
            })
            .catch((error) => {
                alert("Error fetching recipes.");
                console.error(error);
            });
    } else {
        alert("Please enter an ingredient.");
    }
});

function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    if (recipes.length > 0) {
        recipes.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe";

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" />
                <h3>${recipe.title}</h3>
                <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
            `;

            recipeList.appendChild(recipeCard);
        });
    } else {
        recipeList.innerHTML = "<p>No recipes found. Try another ingredient.</p>";
    }
}
const spinner = document.getElementById("spinner");
const recipeContainer = document.getElementById("recipe-container");

async function searchRecipes() {
    const query = document.getElementById("ingredient").value;

    if (!query) {
        alert("Please enter an ingredient.");
        return;
    }

    // Show loading spinner
    spinner.style.display = "block";
    recipeContainer.innerHTML = ""; // Clear previous results

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=your_api_key_here`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            recipeContainer.innerHTML = "<p>No recipes found!</p>";
        } else {
            data.results.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="card-content">
                        <h3>${recipe.title}</h3>
                        <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
                    </div>
                `;
                recipeContainer.appendChild(card);
            });
        }
    } catch (error) {
        recipeContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    } finally {
        // Hide the spinner after the data is loaded
        spinner.style.display = "none";
    }
}
async function searchRecipes() {
    const query = document.getElementById("ingredient").value;
    const cuisine = document.getElementById("cuisine").value;
    const mealType = document.getElementById("mealType").value;
    const diet = document.getElementById("diet").value;

    if (!query) {
        alert("Please enter an ingredient.");
        return;
    }

    // Show loading spinner
    spinner.style.display = "block";
    recipeContainer.innerHTML = ""; // Clear previous results

    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=your_api_key_here`;

    if (cuisine) url += `&cuisine=${cuisine}`;
    if (mealType) url += `&mealType=${mealType}`;
    if (diet) url += `&diet=${diet}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            recipeContainer.innerHTML = "<p>No recipes found!</p>";
        } else {
            data.results.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="card-content">
                        <h3>${recipe.title}</h3>
                        <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
                    </div>
                `;
                recipeContainer.appendChild(card);
            });
        }
    } catch (error) {
        recipeContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    } finally {
        // Hide the spinner after the data is loaded
        spinner.style.display = "none";
    }
}
const card = document.createElement("div");
card.className = "recipe-card";
card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <div class="card-content">
        <h3>${recipe.title}</h3>
        <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
        <button onclick="saveRecipe('${recipe.id}', '${recipe.title}')">Save</button>
    </div>
`;
function saveRecipe(id, title) {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipes.push({ id, title });
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert(`${title} saved to favorites!`);
}
