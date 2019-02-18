/* Functia de afisare a  meniurilor*/
function showProducts(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var produse = JSON.parse(this.responseText);
            var str ="";
            for(var i in produse){
                str += `
                    <div class="row row-product">
                        <div class="col-12 col-md-2">
                            <img class="container-middle__img" src="${produse[i].imagine}" alt="food">
                        </div>
                        <div class="col-12 col-md-7">
                            <div class="container-middle__product-title">
                                ${produse[i].nume}
                            </div>
                            <div class="container-middle__product-details">
                                ${produse[i].ingrediente}
                            </div>
                        </div>
                        <div class="col-12 col-md-3 container-middle__product-actions">
                            <a href="app/admin/reteta.html?id=${i}" class="btn product-edit">Vizualizare</a>
                            <a href="admin/delete.html?id=${i}" class="btn product-delete">Sterge</a>
                        </div>
                    </div>
                `;            
            }
            document.querySelector('.container-middle').innerHTML = str;
            document.querySelector('.header-details__number').innerHTML = `${produse.length}`;
        }
    };
    xhr.open("GET", "https://produsemeniu.firebaseio.com/.json", true);
    xhr.send();
}

function showReteta(){
    var xhr = new XMLHttpRequest();
    let id = window.location.search.substring(4);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let meniu = JSON.parse(this.responseText);
            var str ="";
            for(var produs in meniu){
                str = 
                `
                <div class="reteta">
                    <div class="retata-left">
                        <div class="row">
                            <div class="col-6 col-images">
                                <div class="retata-image">
                                    <img class="container-middle__img" src="${meniu.imagine}" alt="food">
                                </div>
                                <div class="retata-image">
                                    <img class="container-middle__img" src="${meniu.imagine}" alt="food">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-images">
                                <div class="retata-image">
                                    <img class="container-middle__img" src="${meniu.imagine}" alt="food">
                                </div>
                                <div class="retata-image">
                                    <img class="container-middle__img" src="${meniu.imagine}" alt="food">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="retata-right">
                        <div class="reteta-title">
                            <p><span>Titlu : </span>${meniu.nume}</p> 
                        </div>
                        <div class="reteta-produse">
                            <p><span>Ingrediente :</span> ${meniu.ingrediente}</p>
                        </div>
                        <div class="reteta-metoda">
                            <p><span>Reteta : </span></p> ${meniu.reteta}
                        </div>
                    </div>
                </div>
                `;            
            }
            document.querySelector(".afisare-reteta").innerHTML = str;
        }
    };
    xhr.open("GET", `https://produsemeniu.firebaseio.com/${id}.json`, true);
    xhr.send();
}
if(location.href.indexOf("add.html")){
    var adaugare = document.getElementById('adaugareProdus');
    adaugare.addEventListener("click", addNewMenu);
}



async function addNewMenu(){
    let newMenuTitle       = document.querySelector('#addNewMenuTitle').value;
    let newMenuIngredients = document.querySelector('#addNewMenuIngredients').value;
    let newMenuImage       = document.querySelector('#addNewMenuImage').value;
    let newMenuReteta      = document.querySelector('#addNewMenuReteta').value;

    var meniuTotal = {};
    meniuTotal.titlu = newMenuTitle;
    meniuTotal.ingrediente = newMenuIngredients;
    meniuTotal.imagine = newMenuImage;
    meniuTotal.reteta = newMenuReteta;
    var newMenu = JSON.stringify( meniuTotal);

    await ajax("POST", `https://produsemeniu.firebaseio.com/.json`, newMenu);
}

/* -- Functie generala AJAX -- */
function ajax(method, url, body){
    return new Promise(function(resolve, reject){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4){
                if(this.status === 200) {
                    resolve(this.responseText)
                }else{
                    reject(new Error("Conexiunea a esuat. Va rugam incercati din nou!"));
                }
            }
        };
        xhttp.open(method, url, true);
        xhttp.send(body);
    });
} 