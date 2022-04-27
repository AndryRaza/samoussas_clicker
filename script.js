/* Init */
window.onload = initRender;

let score = 0;
let level = 1;

// let autoclick = new Item("Autoclick", 1,  50, 1, true);
let autoclick = new Item("Autoclick", 1,  50, 0, false,1);
let chinois = new Item("Chinois", 100,  300, 0, false,100);
let indien = new Item("Indien", 1000, 3000, 0, false,1000);

let arrItems = [autoclick, chinois, indien];

let unlockrenderitem = [];

let intervalCoreGameInterface = setInterval(checkScore,10)

/* DOM */

let scoreDOM = document.getElementById('score');
let samoussaDOM = document.getElementById('samoussa');
let listitemDOM = document.getElementById('list-item');

/* Events */

samoussaDOM.onclick = addSamoussas;

/* Functions Interface Render*/
function initRender() {
    renderScore();
    renderInterfaceItems();
}

function renderScore() {
    scoreDOM.innerText =  score;
}

function renderInterfaceItems() {
    listitemDOM.innerHTML = null;
    arrItems.map(item=>{
        if(item.unlock ){
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

/* Construct */
function Item(name, count, price, level, unlock,scale) {
    this.name = name;
    this.count = count;
    this.price = price;
    this.level = level;
    this.unlock = unlock;
    this.scale= scale;
}

/* Functions Game */

//When u clik on the samoussa
function addSamoussas() {
    score++;
    renderScore();
}

function upLevel(item){

    let item_ = arrItems.find(e=> e.name == item.id)
    if(score >= item_.price)
    {
        score -= item_.price;   //On déduit le nbre de samoussas de l'achat du niveau
        renderScore();  //On le réaffiche
        item_.level ++; //On up l'item acheté
        item.innerText = "Niveau " +item_.level; //On met à jour le rendu btn niveau
        item_.price *= (item_.level+1); //On met à jour le nouveau prix 
        item_.count = item_.level == 1 ? item_.count : item_.count += item_.scale; 
        document.getElementById('price-'+item_.name).innerText = item_.price + " samoussas"; //On met à jour le rendu du prix
        workingitems(item_)
    }

}

function checkScore(){
    if(score >= 20 && !autoclick.unlock){
        autoclick.unlock = true;
        renderInterfaceItems();
    }
    if(score >= 60 && !chinois.unlock)
    {
        chinois.unlock = true;
        renderInterfaceItems();
    }
    if(score >= 700 && !indien.unlock)
    {
        indien.unlock = true;
        renderInterfaceItems();
    }
}

function workingitems(item){
    switch(item.name){
        case "Autoclick":
            let intervalAC = setInterval(()=>{score += autoclick.count,renderScore()},1000);
            break;
        case "Chinois":
            let intervalChinois = setInterval(()=>{score += chinois.count;renderScore()},1000);
            break;
        case "Indien":
            let intervalIndien = setInterval(()=>{score += indien.count;renderScore()},1000);
        default:
            console.log('err working item autoclick');
            break;
    }

}

