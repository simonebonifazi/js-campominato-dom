// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// *********************************************
// creo la funzione per creare celle 
/**
 * 
 * @param {number} cellNumber indica il numero delle celle
 * @param {number} colsPerRow indica il numero di colonne per riga
 * @returns le celle della griglia
 */
const createCell = (cellNumber, colsPerRow) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = cellNumber;

    //calcolo misure cols per grafica switch
    const sideLenght = `calc(100% / ${colsPerRow})`;
    // aggiungo il calcolo tramite attributo styile in html
    cell.style.height = sideLenght;
    cell.style.width = sideLenght;
    return cell;
}
//milestone 2/ creo funzione random number e verifico funzioni /convertita in arrow f per allenamento
/**
 * 
 * @param {number} min bottom random number
 * @param {number} max top random number
 * @param {number} blacklist number that will not be repeated inside this f
 * @returns random number in min, max range
 */
const createUniqueRandomNumber = (min, max, blacklist) => {
    //variabile contenitore singolo numero
    let randomNumber;
    //almeno una volta pesca un numero
    do {
        //casuale e arrotondato tra min e max inclusi
        randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
        //finchè è diverso dai numeri già generati
    } while (blacklist.includes(randomNumber));

    return randomNumber;
}

/**
 * funzione per stabilire il game over 
 * @param {number[]} bombs indica dietro quali numeri si cela una bomba
 * 
  */
const gameOver = bombs => {

    //prendo tutte le celle
    const cells = document.querySelectorAll('.cell');
    //giro nell'array
    cells.forEach((cell) => {
        //trasformo in numero il testo del markup della cella 
        const cellNumber = parseInt(cell.innerText);
        //attribuisco le classi a seconda dei casi
        let className = bombs.includes(cellNumber) ? 'red' : 'blu'

        //la aggiungo
        cell.classList.add(className, 'clicked')
        //aggiungo nelle celle i fiori o le bombe
        let cellReveal = bombs.includes(cellNumber) ? `<i class="fa-solid fa-bomb"></i>` : `<i class="fa-solid fa-fan"></i>`;
        cell.innerHTML = `${cellReveal}`
    })

}
//dichiaro variabili globali
const gameStarter = document.getElementById('game-starter');
const gameArea = document.getElementById('perimeter');
//variabile fine partita
let isOver = false;
//contatore click / punteggio
let clickCount = 0;
// array di bombe
let bombs = [];
//funzione
gameStarter.addEventListener('click', function () {
    //riassegno la variabile
    let isOver = false;
    //azzero e rielaboro la griglia al click
    gameArea.innerHTML = '';
    //cambio la scritta al bottone 
    gameStarter.innerText = 'Restart...'

    //preparo la mia griglia di default e poichè sarà sempre quadrata
    let cols = rows = 10;
    //bonus_ aggancio subito l'elemento del DOM rispetto al value della select
    const level = document.getElementById('levels-selector').value
    //gestisco i differenti livelli 
    switch (level) {
        case 'normal':
            cols = rows = 9;
            break;
        case 'hard':
            cols = rows = 7;
            break;
    }
    let totalRowsCols = rows * cols;
    //svuoto bombs
    let bombs = [];

    //inserisco 16 numeri casuali nell'array bombs e mi assicuro che non si ripetano

    for (i = 0; i < 16; i++) {
        let bomb = createUniqueRandomNumber(1, totalRowsCols, bombs)
        bombs.push(bomb)
        console.log(bombs)
    }


    for (let i = 1; i <= totalRowsCols; i++) {

        // creo cella tramite mia funzione 
        const cellElement = createCell(i, cols);

        //aggancio cella al click
        cellElement.addEventListener('click', function () {
            //se hai perso, esci dalla funzione
            if (isOver) return;

            //massimo un click per cella
            if (cellElement.classList.contains('clicked')) return;

            //incremento  al click 
            clickCount++
            //verifico
            console.log('il tuo punteggio è di: ' + clickCount)

            //stampo in console il numero della cella
            console.log('hai cliccato la cella numero: ' + i);

            //aggiungo la classe alla cella
            cellElement.classList.add('blu');
            //metto un fiore se non prende la bomba
            this.innerHTML = `<i class="fa-solid fa-fan"></i>`;

            //se il numero del ciclo è uguale al numero delle bombe, allora diventa rossa la cella
            if (bombs.includes(i)) {
                cellElement.classList.add('red');
                console.log(`URlooser. your score is  ${clickCount - 1}`);
                alert(`U loose. Your score is  ${clickCount - 1}. You can check the number makes you lose looking for the red flower. Try again`);

                //bomba al click della casella
                this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                //fermo il conteggio dei punti disabilitando tramite booleana funzione che aggiunge class clicked 
                isOver = true;
                if (isOver) gameOver(bombs)

            }
            //stabilisco principio di vincita
            if (clickCount === totalRowsCols - bombs.length) {
                isOver = true;
                if (isOver) gameOver(bombs)


                console.log('congratulations! U WIN')
                alert('Congratulations! U WIN');
            }


        })

        //stampo gliglie nel loro contenitore
        gameArea.appendChild(cellElement);

    }
})
