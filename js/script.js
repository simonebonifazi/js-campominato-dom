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
// *********************************************
// creo la funzione per creare celle 
function createCell(cellNumber) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = cellNumber;
    return cell;
}
//milestone 2/ creo funzione random number e verifico funzioni /convertita in arrow f per allenamento
const createRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/* steps_milestone 1
1. preparo una variabile let vuota per contenere il punteggio dell'utente
2. al click sulla cella / nell'ultimo eventlistener/ aumenta ogni volta il numero del contatore
*/

/*steps milestone3_
0.creiamo un array che segnalerà le posizioni delle bombe
1. riempiamo l'array con 16 numeri casuali compresi tra l'1 e il 100 CHE NON SI RIPETANO
2. verifico che il numero selezionato dall'utente coincida con i numeri dell'array
dovrò usare un parseint per convertire i dati che mi arrivano all'array
3. se coincidono i numeri di cui al punto 2, cella rossa + alert / else, normale 
3.1
*/
/*steps milestone__4
0. per determinare come finisce la partita dobbiamo tenere presente che se clicca 
tutte le celle senza bombe ha vinto. 
1. lo stabilisco come differenza tra total cells e bombs 
2.tramite variabile booleana preposta al principio che assume valore false all'origine e diventa true alla fine al verificarsi della condizione
3.dove lo metto?
*/
//dichiaro variabili globali
const gameStarter = document.getElementById('game-starter');
const gameArea = document.getElementById('perimeter');

//contatore click / punteggio
let clickCount = 0;
// array di bombe
let bombs = [];
//variabile contenitore singolo numero
let randomNumber;
//preparo la mia griglia e poichè sarà sempre quadrata
let cols = rows = 10;
let totalRowsCols = rows * cols;
gameStarter.addEventListener('click', function () {
    //azzero e rielaboro la griglia al click
    gameArea.innerHTML = '';
    //cambio la scritta al bottone 
    gameStarter.innerText = 'Ricomincia...'

    //svuoto bombs
    let bombs = [];

    //inserisco 16 numeri casuali nell'array bombs e mi assicuro che non si ripetano

    for (i = 0; i < 16; i++) {
        do {
            randomNumber = createRandomNumber(1, 100)
        } while (bombs.includes(randomNumber))
        bombs.push(randomNumber)
        console.log(bombs)
    }

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
            //se il numero del ciclo è uguale al numero delle bombe, allora diventa rossa la cella
            if (bombs.includes(i)) {
                cellElement.classList.add('red');
                console.log(`URlooser. your score is  ${clickCount}`);
                // alert(`URlooser. your score is  ${clickCount}`)
                //dovrei fermaare il conteggio dei punti?
                //non funzia :( if (cellElement.classList.contains('red')) return;
            }
            //stabilisco principio di vincita; aggiungo una seconda condizione perchè al momento non sono riuscito a fermare il gioco in caso di 
            //click su bomba, ma solo a far apparire l'alert 
            if (clickCount === totalRowsCols - bombs.length && !cellElement.classList.includes('red')) {

                console.log('congratulations! U WIN THE GAME')
                alert('congratulations! U WIN THE GAME');

            }
        })


        //stampo gliglie nel loro contenitore
        gameArea.appendChild(cellElement);
    }
})
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
