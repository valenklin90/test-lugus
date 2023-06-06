
// Requête AJAX pour récupérer les données JSON partie fiche produit
function getProductData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://my-json-server.typicode.com/Lugus-Shopify/hiring/product', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var productData = JSON.parse(xhr.responseText);
      displayProductData(productData);
    }
  };
  xhr.send();
}

// Fonction pour afficher les données du produit dans la fiche produit
function displayProductData(productData) {
  document.getElementById('product-image').src = productData.variants[0].image;
  document.getElementById('product-title').textContent = productData.title;
  document.getElementById('product-price').textContent = '$' + productData.price;

  var variantColors = document.getElementById('variant-colors');
  variantColors.innerHTML = '<label>Couleur</label>';
  var uniqueColors = []; // Tableau pour stocker les couleurs uniques
  for (var i = 0; i < productData.variants.length; i++) {
    var variant = productData.variants[i];
    if (!uniqueColors.includes(variant.color)) { // Vérifier si la couleur n'est pas déjà présente
      uniqueColors.push(variant.color); // Ajouter la couleur unique au tableau
      var button = document.createElement('button');
      button.classList.add('color-button');
      button.textContent = variant.color;
      variantColors.appendChild(button);

      // Ajouter le gestionnaire d'événement pour changer la couleur sélectionnée
      button.addEventListener('click', function () {
        // Supprimer la classe active des autres boutons de couleur
        var colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });

        this.classList.add('active'); // Ajouter la classe active au bouton cliqué

        // Modifier l'image en fonction de la couleur sélectionnée
        var selectedColor = this.textContent;
        var selectedVariant = productData.variants.find(function (variant) {
          return variant.color === selectedColor;
        });
        if (selectedVariant) {
          document.getElementById('product-image').src = selectedVariant.image;
        }
      });

      // Vérifier si la couleur est bleu et ajouter la classe active par défaut
      if (variant.color === 'Blue') {
        button.classList.add('active');
        // Modifier l'image par défaut
        document.getElementById('product-image').src = variant.image;
      }
    }

  }

  var variantSizes = document.getElementById('variant-sizes');
  variantSizes.innerHTML = '<label>Taille</label>';
  var uniqueSizes = []; // Tableau pour stocker les tailles uniques
  for (var i = 0; i < productData.variants.length; i++) {
    var variant = productData.variants[i];
    if (!uniqueSizes.includes(variant.size)) { // Vérifier si la taille n'est pas déjà présente
      uniqueSizes.push(variant.size); // Ajouter la taille unique au tableau
      var button = document.createElement('button');
      button.classList.add('size-button');
      button.textContent = variant.size;
      variantSizes.appendChild(button);

      // Ajouter le gestionnaire d'événement pour changer la taille sélectionnée
      button.addEventListener('click', function () {
        // Supprimer la classe active des autres boutons de taille
        var sizeButtons = document.querySelectorAll('.size-button');
        sizeButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });

        this.classList.add('active'); // Ajouter la classe active au bouton cliqué
      });

      // Vérifier si la taille est "L" et ajouter la classe active par défaut
      if (variant.size === 'L') {
        button.classList.add('active');
      }
    }
  }

  // Sélecteur de quantité
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");
  const quantityInput = document.getElementById("quantity-input");

  decreaseBtn.addEventListener("click", decreaseQuantity);
  increaseBtn.addEventListener("click", increaseQuantity);

  function decreaseQuantity() {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
    }
  }

  function increaseQuantity() {
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
  }

  document.getElementById('product-description').textContent = productData.description;
}

// Appel de la fonction pour récupérer les données du produit
getProductData();


// Requête AJAX pour récupérer les données JSON partie avis/commentaires
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://my-json-server.typicode.com/Lugus-Shopify/hiring/product', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var jsonData = JSON.parse(xhr.responseText);
    afficherEvaluations(jsonData);
  }
};
xhr.send();

// Fonction pour afficher les évaluations
function afficherEvaluations(jsonData) {
  var ratings = jsonData.reviews;
  var averageRating = calculerMoyenne(ratings);

  // Afficher la moyenne des avis
  var averageRatingElement = document.getElementById('average-rating');
  averageRatingElement.textContent = averageRating.toFixed(1) + '/5 (' + ratings.length + ' avis)';

  // Afficher les commentaires
  var commentsElement = document.getElementById('comments');
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];

    // Créer un élément de commentaire
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Ajouter le commentaire
    var commentTextElement = document.createElement('p');
    commentTextElement.textContent = rating.comment;
    commentElement.appendChild(commentTextElement);

    // Ajouter l'utilisateur
    var userElement = document.createElement('p');
    userElement.textContent = 'John Doe';
    commentElement.appendChild(userElement);

    // Ajouter une div englobant les éléments de chaque commentaire
    var commentWrapper = document.createElement('div');
    commentWrapper.classList.add('comment-wrapper');
    commentWrapper.appendChild(commentTextElement);
    commentWrapper.appendChild(userElement);
    commentElement.appendChild(commentWrapper);

    // Ajouter la note en couleur à droite du commentaire
    var ratingElement = document.createElement('span');
    ratingElement.classList.add('comment-rating');
    ratingElement.textContent = rating.rate + '/5';
    commentElement.appendChild(ratingElement);

    // Ajouter le commentaire à la liste des commentaires
    commentsElement.appendChild(commentElement);

  }
}

// Fonction pour calculer la moyenne des avis
function calculerMoyenne(ratings) {
  var total = 0;
  for (var i = 0; i < ratings.length; i++) {
    total += ratings[i].rate;
  }
  return total / ratings.length;
}