// Spēles sākuma vērtība
const originalTotal = 21
let total = originalTotal

// Izvada spēles sākuma vērtību uz ekrāna
document.getElementById("total").innerHTML = total

/* -=-=-=-=-=-=-=-= Pirmā gājiena izvēle un spēles sākums =-=-=-=-=-=-=-=-*/

function chooseFirstPlayer() {
    log("Izvēlies, kurš sāks spēli!");
}

function userGoesFirst() {
    isUserTurn = true
    startGame()
}

function computerGoesFirst() {
    isUserTurn = false
    izslegtPogas(true)
    startGame()
}

/* -=-=-=-=-=-=-=-= Spēlētāja un datora izvēles =-=-=-=-=-=-=-=-*/

function speletajaIzvele(izvele) {

    // Pievieno ierakstu spēles vēsturē
    log("Spēlētājs atņem: " + izvele)

    // Veic atņemšanu no spēles vērtības ar izvēlēto vērtību
    atnemt(izvele)
    
    // Izslēdz spēlētāja kontroles
    izslegtPogas(true)
    
    // Parāda veikto izvēli ar animāciju
    doAnimation(izvele)
    
    // Pagaida 2s, kamēr izspēlējas animācija
    setTimeout(() => {

         // Parbauda vai spēlētājs ir uzvarējis
        if (total == 1) {
            endGame("speletajs")

        // Nākamo gājienu veic dators
        } else {
            datoraIzvele()
        }
    },2000)
    
}

function datoraIzvele() {

    let izvele
    let bestScore = -Infinity;
    for (let i = 1; i <= 3; i++) {
      if (total > i) {
        let score = minimax(total - i, false);
        
        // Atrod izvēli ar vislielāko "bestScore"
        if (score > bestScore) {
          bestScore = score;

          // Izvēle ir vienāda ar labākā iespējamā gājiena izvēli
          izvele = i;
        }
      }
    }

    // Pievieno ierakstu spēles vēsturē
    log("Dators atņem: " + izvele)

    // Veic atņemšanu no spēles vērtības ar izvēlēto vērtību
    atnemt(izvele)

    // Parāda veikto izvēli ar animāciju
    doAnimation(izvele)

    // Pagaida 1,6s, kamēr izspēlējas animācija
    setTimeout(() => {
        // Parbauda vai dators ir uzvarējis
        if (total == 1) {
            endGame("dators")

        // Nākamo gājienu veic spēlētājs
        } else {
            izslegtPogas(false)
            parbaudaPogas()
        }
    },1600)
}

/* -=-=-=-=-=-=-=-= Minimax Algoritms =-=-=-=-=-=-=-=-*/
function minimax(total, isMaximizingPlayer) {

    // Pārbauda vai spēle jau nav sasniegusi beigu rezultātu
    if (total == 1) {
        if (isMaximizingPlayer) {
            return -1
        } else {
            return 1
        }
    }

    // Rezultāts tiek maksimizēts, lai iegūtu labāko iespējamo gājienu
    if (isMaximizingPlayer) {
        let bestScore = -Infinity;

        // Apskata, katru iespējamo izvēli
        for (let i = 1; i <= 3; i++) {

            // Pārbauda, jau nav sasniegts spēles beigu rezultāts
            if (total >= i) {

                // Rekursīvi atkārto galoritmu, apskatot, katru iespējamo gājienu
                let score = minimax(total - i, false);

                // Atrod lielāko "bestScore", kas norādīs uz labāko iespējamāo gājiena izvēli
                if (score > bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore
        
    }

    // Rezultāts tiek minimizēts, lai iegūtu sliktāko iespējamo gājienu
    else {
        let bestScore = Infinity;

        // Apskata, katru iespējamo izvēli
        for (let i = 1; i <= 3; i++) {

            // Pārbauda, jau nav sasniegts spēles beigu rezultāts
            if (total >= i) {

                // Rekursīvi atkārto galoritmu, apskatot, katru iespējamo gājienu
                let score = minimax(total - i, true);

                // Atrod mazāko "bestScore", kas norādīs uz sliktāko iespējamāo gājiena izvēli
                if (score < bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore
    }
}

/* -=-=-=-=-=-=-=-= CSS Palīgfukcijas =-=-=-=-=-=-=-=-*/

function toggleGameStart() {

    // Iestata spēles redzamo sākuma vērtību
    document.getElementById("total").innerHTML = total

    // Parāda spēles kontroles un punktu ekrēnu
    document.getElementById("game-items").style.display = "flex"

    // Paslēpj spēles sākuma ekrēnu
    document.getElementById("game-start").style.display = "none"

    // Parāda spēles vēstures ekrānu
    document.getElementById("log-container").style.display = "block"

    // Paslēpj spēles noteikumu ekrēnu
    document.getElementById("noteikumi-container").style.display = "none"
}

function toggleGameEnd() {

    // Paslēpj spēles kontroles un punktu ekrēnu
    document.getElementById("game-items").style.display = "none"

    // Paslēpj spēles nosaukumu
    document.getElementById("game-name").style.display = "none"

    // Parāda spēles beigu ekrēnu
    document.getElementById("game-end").style.display = "flex"
}

function toogleGameReset() {

    // Parāda spēles nosaukumu
    document.getElementById("game-name").style.display = "block"

    // Parāda spēles sākuma ekrēnu
    document.getElementById("game-start").style.display = "block"

    // Paslēpj spēles beigu ekrēnu
    document.getElementById("game-end").style.display = "none"

    // Paslēpj spēles vēstures ekrēnu
    document.getElementById("log-container").style.display = "none"

    // Parāda spēles noteikumu ekrēnu
    document.getElementById("noteikumi-container").style.display = "block"
}

/* -=-=-=-=-=-=-=-= Core funkcijas =-=-=-=-=-=-=-=-*/

function startGame() {

    // Parāda un paslēpj nepieciešamos logus spēles sākumam
    toggleGameStart()
    
    // Pārbauda vai pirmais gājies ir spēlētājam vai datoram
    if (isUserTurn == true) {
        log("Spēli sāk spēlētājs!")
        log("Spēle sākuma vērtība: 21")
        izslegtPogas(false);
    } else {
        log("Spēli sāk dators!")
        log("Spēle sākuma vērtība: 21")

        setTimeout(datoraIzvele, 400)
        
    }
}

function endGame(who) {

    // Ja uzvar spēlētājs, parāda attiecīgos tekstus
    if (who == "speletajs") {
        log("Spēlētājs uzvar!","win")
        document.getElementById("result").innerHTML = "Apsveicam!"
        document.getElementById("result-teksts").innerHTML = "Jūs esat uzvarējis!"

    // Ja uzvar dators, parāda attiecīgos tekstus
    } else {
        log("Dators uzvar!","lose")
        document.getElementById("result").innerHTML = "Zaudējums!"
        document.getElementById("result-teksts").innerHTML = "Lai veicas labāk nākamreiz!"
    }

    // Parāda un paslēpj nepieciešamos logus spēles beigām
    toggleGameEnd(true)
}

function resetGame() {

    // Izmaina redzamos spēles logus
    toogleGameReset(true)

    // Izslēdz lietotāja kontroles
    izslegtPogas(false)

    // Notīra spēles vēsturi
    clearLog()

    // Ļauj izvēlēties pirmā gājiena spēlētāju
    chooseFirstPlayer()

    // Iestata sākotnējo spēles vērtību
    total = originalTotal
}

function updateGame(newTotal) {
    // Izmaina un ieraksta spēles vēsturē patreizējo vērtību
    document.getElementById("total").innerHTML = newTotal
    log("Jaunā spēles vērtība: " + newTotal)
}

function atnemt(izvele) {

    // Aprēķina jauno spēles vērtību pēc izvēles veikšanas
    total = total - izvele

    // Atjauno spēli parādot pareizo spēles vērtību uz ekrāna
    updateGame(total)
}

/* -=-=-=-=-=-=-=-= Spēles animācijas =-=-=-=-=-=-=-=-*/

function fadeIn(elements) {
    // Palielina opacaty 0.4s garumā no 0 līdz 1
    elements.animate (
        { opacity: [0, 1] },
        { duration: 400 }
    );
    
    // Iestata paliekošo opacity vērtību uz atlikušo laiku
    elements.style.opacity = 1
    
    // Pagaida papildus 0.4s un sāk opacity samazināšanu
    setTimeout(() => {
        fadeOut(elements);
    }, 800);
}

function fadeOut(elements) {
    // Samazina opacaty 0.4s garumā no 1 līdz 0
    elements.animate(
        { opacity: [1, 0] },
        { duration: 400 }
    );
    
    // Iestata paliekošo opacity vērtību
    elements.style.opacity = 0
}

function doAnimation(skaitlis) {

    const elements = document.getElementById("action")

    // Izmaina ekrānā redzamo vērtību, kas tiek atņemta
    document.getElementById("action-number").innerHTML = "-" + skaitlis

    // Uzsāk opacity mainīšanas funkciju, kas nodrošina animācijas efektu
    fadeIn(elements)
}

/* -=-=-=-=-=-=-=-= Spēles vēstures logs =-=-=-=-=-=-=-=-*/

function log(zina,parametrs) {
    
    // Pārbauda vai ziņas rezultāts ir uzvara
    if (parametrs == "win") {
        document.getElementById("log").innerHTML += '<p class="log_message win_message">' + zina + '</p>'
    } else if (parametrs == "lose") {
        document.getElementById("log").innerHTML += '<p class="log_message lose_message">' + zina + '</p>'
    } else
    document.getElementById("log").innerHTML += '<p class="log_message">' + zina + '</p>'
    
    // Scrollbars vienmer lejā
    const logHeader = document.querySelector('.log-body')
    logHeader.scrollTop = logHeader.scrollHeight
}

function clearLog() {
    let logMessages = document.getElementsByClassName('log_message');

    // Tiek dzēstas visas spēles vēstures ziņas
    while (logMessages.length > 0) {
        logMessages[0].parentNode.removeChild(logMessages[0]);
    }
}

/* -=-=-=-=-=-=-=-= Spēlētāja pogas =-=-=-=-=-=-=-=-*/

function izslegtPogas(statuss) {
    const speletajaPoga = document.getElementsByClassName("speletajaPoga")

    // Izslēdz vai ieslēdz visas spēlētāja pogas
    for (let i = 0; i < speletajaPoga.length; i++) {
        speletajaPoga[i].disabled = statuss
    }
}

function parbaudaPogas() {

    // Pārbauda un izslēdz pogas ar vērtībām, kas dod iespēju nonākt pie nekorektas spēles vērtības
    if (total == 2) {
        document.getElementById("tris").disabled = true
        document.getElementById("divi").disabled = true
    } else if (total == 3) {
        document.getElementById("tris").disabled = true
    }
}