/* Init */
window.onload = initRender;

let score = 40;
let level = 1;

let autoclick = new Item("Autoclick", 1,  50, 1, true);
//let autoclick = new Item("Autoclick", 1,  50, 1, false);
let chinois = new Item("Chinois", 100,  300, 1, false);
let indien = new Item("Indien", 1000, 3000, 1, false);

let arrItems = [autoclick, chinois, indien];


//let intervalCoreGameInterface = setInterval(checkScore,10)

/* DOM */

let scoreDOM = document.getElementById('score');
let samoussaDOM = document.getElementById('samoussa');
let listitemDOM = document.getElementById('list-item');

/* Events */

samoussaDOM.onclick = addSamoussas;

/* Functions */
function initRender() {
    renderScore();
    renderInterfaceItems();
}

function renderScore() {
    scoreDOM.innerText = score;
}

function renderInterfaceItems() {

    arrItems.map(item=>{
        if(item.unlock){
            listitemDOM.innerHTML += 
            `
                <li class="list-group-item d-flex justify-content-between">
                    <p class="my-auto">${item.name}</p>
                    <div class="d-flex">
                        <p class="my-auto mx-3" id="${"price-"+ item.name}">${item.price} samoussas</p>
                        <button class="btn btn-success" id="${item.name}" onclick="upLevel(this);" >Niveau ${item.level}</button>
                    </div>
                </li>
            `;
        }
    })

}

function Item(name, count, price, level, unlock) {
    this.name = name;
    this.count = count;
    this.price = price;
    this.level = level;
    this.unlock = unlock;
}

function addSamoussas() {
    score++;
    renderScore();
}

function upLevel(item){

    let item_ = arrItems.find(e=> e.name == item.id)
    if(score >= (item_.price * item_.level))
    {
        score -= item_.price*item_.level;   //On déduit le nbre de samoussas de l'achat du niveau
        renderScore();  //On le réaffiche
        item_.level ++; //On up l'item acheté
        item.innerText = "Niveau " +item_.level; //On met à jour le rendu btn niveau
        item_.price *= item_.level; //On met à jour le nouveau prix 
        document.getElementById('price-'+item_.name).innerText = item_.price + " samoussas"; //On met à jour le rendu du prix
    }

}

function checkScore(){
    if(score >= 20 && !autoclick.unlock){
        autoclick.unlock = true;
        btnAutoclick = document.getElementById('btn-Autoclick'); 
        renderInterfaceItems();
    }
}

