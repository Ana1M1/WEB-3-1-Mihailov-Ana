function calculateSum(a, b) {
    return a + b;
}

console.log("Exercițiul 1:");
console.log("Suma 5 + 3 =", calculateSum(5, 3));
console.log("Suma 10 + 20 =", calculateSum(10, 20));


let student = {
    name: "Ana",
    age: 17,
    grade: 8,
    introduce: function() {
        console.log("Eleva " + this.name + " are " + this.age + " ani.");
    }
};

console.log("Exercițiul 2:");
student.introduce();
student.grade = 10;
console.log("Noua notă:", student.grade);


let gameScore = {
    player: 0,
    computer: 0,
    draws: 0,
    
    displayScore: function() {
        alert("Scor actual:\nJucător: " + this.player + " | Calculator: " + this.computer + " | Egalități: " + this.draws);
    }
};

let alegereJucatorEl = document.getElementById("alegere-jucator");
let alegereCalcEl = document.getElementById("alegere-calc");
let rezultatRundaEl = document.getElementById("rezultat-runda");

let scorJucatorEl = document.getElementById("scor-jucator");
let scorCalcEl = document.getElementById("scor-calc");
let scorEgalaEl = document.getElementById("scor-egala");
let rundeTotaleEl = document.getElementById("runde-totale");
let mesajLiderEl = document.getElementById("mesaj-lider");

function alegereCalculator() {
    let variante = ["piatra", "hartia", "foarfeca"];
    let numarAleator = Math.floor(Math.random() * 3);
    return variante[numarAleator];
}

function formateazaOptiune(text) {
    if (text === "piatra") return "🗿 Piatra";
    if (text === "hartia") return "📃 Hârtia";
    if (text === "foarfeca") return "✂️ Foarfeca";
    return text;
}

function joaca(alegereJucator) {
    let alegereCalc = alegereCalculator();

    alegereJucatorEl.innerText = formateazaOptiune(alegereJucator);
    alegereCalcEl.innerText = formateazaOptiune(alegereCalc);

    if (alegereJucator === alegereCalc) {
        rezultatRundaEl.innerText = "Egalitate!";
        gameScore.draws = gameScore.draws + 1;
    } 
    else if (
        (alegereJucator === "piatra" && alegereCalc === "foarfeca") ||
        (alegereJucator === "foarfeca" && alegereCalc === "hartia") ||
        (alegereJucator === "hartia" && alegereCalc === "piatra")
    ) {
        rezultatRundaEl.innerText = "Ai câștigat runda!";
        gameScore.player = gameScore.player + 1;
    } 
    else {
        rezultatRundaEl.innerText = "Calculatorul a câștigat runda!";
        gameScore.computer = gameScore.computer + 1;
    }

    scorJucatorEl.innerText = gameScore.player;
    scorCalcEl.innerText = gameScore.computer;
    scorEgalaEl.innerText = gameScore.draws;
    
    let totalRunde = gameScore.player + gameScore.computer + gameScore.draws;
    rundeTotaleEl.innerText = totalRunde;

    if (gameScore.player > gameScore.computer) {
        mesajLiderEl.innerText = "Bravo, ești în frunte!";
    } else if (gameScore.computer > gameScore.player) {
        mesajLiderEl.innerText = "Calculatorul conduce!";
    } else {
        mesajLiderEl.innerText = "Este egalitate perfectă!";
    }

    gameScore.displayScore();

    if (gameScore.player === 5) {
        alert("FELICITĂRI! Ai câștigat meciul (5 victorii)!");
        reseteazaJocul();
    } else if (gameScore.computer === 5) {
        alert("Meciul s-a încheiat. Calculatorul a ajuns la 5 victorii!");
        reseteazaJocul();
    }
}

function reseteazaJocul() {
    gameScore.player = 0;
    gameScore.computer = 0;
    gameScore.draws = 0;

    scorJucatorEl.innerText = 0;
    scorCalcEl.innerText = 0;
    scorEgalaEl.innerText = 0;
    rundeTotaleEl.innerText = 0;

    alegereJucatorEl.innerText = "-";
    alegereCalcEl.innerText = "-";
    rezultatRundaEl.innerText = "Spor la joc!";
    mesajLiderEl.innerText = "Să începem!";
}

document.getElementById("btn-piatra").addEventListener("click", function() {
    joaca("piatra");
});

document.getElementById("btn-hartia").addEventListener("click", function() {
    joaca("hartia");
});

document.getElementById("btn-foarfeca").addEventListener("click", function() {
    joaca("foarfeca");
});

document.getElementById("btn-reset").addEventListener("click", reseteazaJocul);