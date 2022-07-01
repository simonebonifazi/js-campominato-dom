/*
Traccia:
# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/
/* traccia bis
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

*/
/* *********************************************
creo la funzione per creare celle */
function createCell(cellNumber) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = cellNumber;
    return cell;
}

/* steps_milestone 1
1. preparo una variabile let vuota per contenere il punteggio dell'utente
2. al click sulla cella / nell'ultimo eventlistener/ aumenta ogni volta il numero del contatore
questions: devo avere un limite massimo ai click dell'utente?  
*/

//dichiaro variabili globali
const gameStarter = document.getElementById('game-starter');
const gameArea = document.getElementById('perimeter');

//contatore click / punteggio
let clickCount = 0;

//preparo la mia griglia
let rows = 10;
//poichè la mia griglia sarà sempre quadrata
let cols = rows;
let totalRowsCols = rows * cols;
gameStarter.addEventListener('click', function () {
    //azzero e rielaboro la griglia al click
    gameArea.innerHTML = '';
    //cambio la scritta al bottone 
    gameStarter.innerText = 'Ricomincia...'


    for (let i = 1; i <= totalRowsCols; i++) {

        // creo cella tramite mia funzione 
        const cellElement = createCell(i);

        //aggancio cella al click
        cellElement.addEventListener('click', function () {

            //massimo un click per cella
            if (cellElement.classList.contains('clicked')) return;

            //incremento  al click e verifico
            clickCount++
            console.log('il tuo punteggio è di: ' + clickCount)

            //stampo in console il numero della cella
            console.log('hai cliccato la cella numero: ' + i);
            //aggiungo la classe alla cella
            cellElement.classList.add('clicked');

        })

        //stampo gliglie nel loro contenitore
        gameArea.appendChild(cellElement);
    }
})
/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// # MILESTONE 2
// Facciamo in modo di generare 16 numeri casuali(tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
*/