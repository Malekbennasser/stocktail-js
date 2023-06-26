let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
if (localStorage.length === 0) {
  inventaire = [];
} else {
  inventaire = JSON.parse(localStorage.getItem("inventaire"));
  render(inventaire);
}

// display function_____________________________________________
function render(array) {
  let li = "";
  array.forEach((elementr) => {
    // create nonAlco list_____________________________________________
    if (elementr.type === "nonAlco") {
      li =
        li +
        `<li>Nom boisson: <input class="inputBoisson" type="text" value="${elementr.boisson}"readonly> 
         Quantite: <input class="inputQuantite" type="number"  min="0" value="${elementr.quantite}"> 
         Prix d'achat: <input class="inputPrixAchate" type="number" value="${elementr.prixAchate}"readonly> 
         Prix de vente: <input type="number" class="inputPrixVente" value="${elementr.prixVente}"readonly> 
         Marge % : <input type="number" class="inputMarge" value="${elementr.marge}"readonly> 
         Prix de vente TTC <input type="number" class="inputPrixVenteTtc" value="${elementr.prixVenteTtc}"readonly>
         Type : <input class="inputType" type="text" value="${elementr.type}"readonly>
         <input type="number" class="inputDegree" value="${elementr.degre}"readonly hidden>
         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>  </li>`;
    }
    //create alco list_____________________________________________
    else {
      li =
        li +
        `<li>Nom boisson: <input class="inputBoisson" type="text" value="${elementr.boisson}"readonly> 
         Quantite: <input class="inputQuantite" type="number" min="0" value="${elementr.quantite}"> 
         Prix d'achat: <input class="inputPrixAchate" type="number" value="${elementr.prixAchate}"readonly> 
         Prix de vente: <input type="number" class="inputPrixVente" value="${elementr.prixVente}"readonly> 
         Marge % : <input type="number" class="inputMarge" value="${elementr.marge}"readonly> 
         Prix de vente TTC <input type="number" class="inputPrixVenteTtc" value="${elementr.prixVenteTtc}"readonly>
         Type : <input class="inputType" type="text" value="${elementr.type}"readonly>
         Degree :  <input type="number" class="inputDegree" value="${elementr.degre}"readonly>
         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>  </li>`;
    }
  });
  ulContainer.innerHTML = li;

  // declaration for modification of a line function_____________________________________________
  let inputBoisson = document.querySelectorAll(".inputBoisson");
  let inputQuantite = document.querySelectorAll(".inputQuantite");
  let inputPrixAchate = document.querySelectorAll(".inputPrixAchate");
  let inputPrixVente = document.querySelectorAll(".inputPrixVente");
  let inputMarge = document.querySelectorAll(".inputMarge");
  let inputPrixVenteTtc = document.querySelectorAll(".inputPrixVenteTtc");
  let inputType = document.querySelectorAll(".inputType");
  let inputDegre = document.querySelectorAll(".inputDegree");
  let modif = document.querySelectorAll(".btn-Mof");

  //modif function//create alco list_____________________________________________
  modif.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (element.innerText.toLowerCase() == "edit") {
        element.style.backgroundColor = "green";
        element.innerText = "SAVE";
        inputBoisson[index].focus();
        inputBoisson[index].removeAttribute("readonly");
        // inputQuantite[index].removeAttribute("readonly");
        inputPrixAchate[index].removeAttribute("readonly");
        inputPrixVente[index].removeAttribute("readonly", "readonly");
        inputMarge[index].removeAttribute("readonly");
        inputPrixVenteTtc[index].removeAttribute("readonly");
        inputType[index].removeAttribute("readonly");
        inputDegre[index].removeAttribute("readonly", "hidden");
      } else {
        element.innerText = "EDIT";
        inputBoisson[index].setAttribute("readonly", "readonly");
        // inputQuantite[index].setAttribute("readonly", "readonly");
        inputPrixAchate[index].setAttribute("readonly", "readonly");
        inputPrixVente[index].setAttribute("readonly", "readonly");
        inputMarge[index].setAttribute("readonly", "readonly");
        inputPrixVenteTtc[index].setAttribute("readonly", "readonly");
        inputType[index].setAttribute("readonly", "readonly");
        inputDegre[index].setAttribute("readonly", "readonly");
        inventaire[index].boisson = inputBoisson[index].value;
        inventaire[index].quantite = inputQuantite[index].value;
        inventaire[index].prixAchate = inputPrixAchate[index].value;
        inventaire[index].prixVente = inputPrixVente[index].value;
        inventaire[index].marge = (
          (inputPrixVente[index].value / inputPrixAchate[index].value) *
          100
        ).toFixed(2);
        inventaire[index].prixVenteTtc = (
          inputPrixVente[index].value * 1.2
        ).toFixed(2);
        inventaire[index].type = inputType[index].value;
        if (inventaire[index].type === "nonAlco") {
          inputDegre[index].value = undefined;
        }
        inventaire[index].degre = inputDegre[index].value;
        // display the modified line_____________________________________________
        render(inventaire);
        // saving the new table in local storage after modify_____________________________________________
        localStorage.setItem("inventaire", JSON.stringify(inventaire));
        console.log(inventaire);
      }
    });
  });

  // remove line function_____________________________________________
  let allsuppBtn = document.querySelectorAll(".btn-Sup");
  allsuppBtn.forEach((elementsup, indexsup) => {
    elementsup.addEventListener("click", () => {
      inventaire.splice(indexsup, 1);
      // display the new table without the deleted line_____________________________________________
      render(inventaire);
      console.log(inventaire);
      // saving the new table in local storage after modify_____________________________________________
      localStorage.setItem("inventaire", JSON.stringify(inventaire));
    });
  });

  // sort by quantity and quantity coloring_____________________________________________
  inputQuantite.forEach((elementInp, indexInp) => {
    elementInp.addEventListener("input", () => {
      if (inputQuantite[indexInp].value >= 10) {
        elementInp.style.backgroundColor = "rgb(198, 255, 198";
      } else {
        elementInp.style.backgroundColor = "#fad4d4";
      }
      inventaire[indexInp].quantite = inputQuantite[indexInp].value;
      inventaire.sort((a, b) => Number(a.quantite) - Number(b.quantite));
      console.log(inventaire);
      render(inventaire);
      localStorage.setItem("inventaire", JSON.stringify(inventaire));
    });
    // condition to check always the value of inputQuantite and apply the color
    if (inputQuantite[indexInp].value >= 10) {
      elementInp.style.backgroundColor = "rgb(198, 255, 198";
    } else {
      elementInp.style.backgroundColor = "#fad4d4";
    }
  });
}
// add product function_____________________________________________
function addProduit(e) {
  e.preventDefault();
  let data = new FormData(form);
  if (data.get("type") === "nonAlco") {
    let produit = new Produit(
      data.get("boisson"),
      data.get("quantite"),
      data.get("prixAchate"),
      data.get("prixVente"),
      ((data.get("prixVente") / data.get("prixAchate")) * 100).toFixed(2), // .toFixed(2) make the number with only 2 decimals
      data.get("prixVente") * 1.2,
      data.get("type")
    );
    inventaire.push(produit);
    console.log(inventaire);
    render(inventaire, "all");
    localStorage.setItem("inventaire", JSON.stringify(inventaire));
  } else {
    let produit = new Produit(
      data.get("boisson"),
      data.get("quantite"),
      data.get("prixAchate"),
      data.get("prixVente"),
      ((data.get("prixVente") / data.get("prixAchate")) * 100).toFixed(2),
      data.get("prixVente") * 1.2,
      data.get("type"),
      data.get("degre")
    );
    inventaire.push(produit);
    console.log(inventaire);
    inventaire.sort((a, b) => Number(a.quantite) - Number(b.quantite));
    render(inventaire, "all");
    localStorage.setItem("inventaire", JSON.stringify(inventaire));
  }

  form.reset();
}
// create a list on submit from the form elements_____________________________________________
form.addEventListener("submit", addProduit);

//constructor//create alco list_____________________________________________
function Produit(
  boisson,
  quantite,
  prixAchate,
  prixVente,
  marge,
  prixVenteTtc,
  type,
  degre
) {
  this.boisson = boisson;
  this.quantite = quantite;
  this.prixAchate = prixAchate;
  this.prixVente = prixVente;
  this.marge = marge;
  this.prixVenteTtc = prixVenteTtc;
  this.type = type;
  this.degre = degre;
}
