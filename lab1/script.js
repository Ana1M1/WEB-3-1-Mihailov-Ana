
function calcul(nrPersoane, pretUnitar) {
    let reducere = 0;

    if (nrPersoane >= 10) {
        reducere = 0.15;
    } else if (nrPersoane >= 5) {
        reducere = 0.10;
    }

    const subtotal = nrPersoane * pretUnitar;
    const total = subtotal - subtotal * reducere;

    return {
        subtotal: subtotal,
        reducere: reducere,
        total: Math.round(total)
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const selectSpectacol = document.getElementById("spectacol");
    const inputPersoane = document.getElementById("persoane");
    const btn = document.getElementById("calculeazaBtn");
    const rezultat = document.getElementById("rezultat");
    const pretEl = rezultat.querySelector(".calc__price");
    const noteEl = rezultat.querySelector(".calc__note");

    function afiseazaRezultat() {
        const pretUnitar = Number(selectSpectacol.value);
        let nrPersoane = Number(inputPersoane.value);

        if (!nrPersoane || nrPersoane < 1) {
            nrPersoane = 1;
            inputPersoane.value = 1;
        }

        const { total, reducere } = calcul(nrPersoane, pretUnitar);

        pretEl.textContent = total.toLocaleString("ro-RO") + " MDL";

        if (reducere > 0) {
            noteEl.textContent =
                nrPersoane + " bilete, reducere de grup " + (reducere * 100) + "%.";
        } else {
            noteEl.textContent = nrPersoane + " bilet" + (nrPersoane > 1 ? "e" : "") + ", fără reducere.";
        }
    }

    btn.addEventListener("click", afiseazaRezultat);


    selectSpectacol.addEventListener("change", afiseazaRezultat);
    inputPersoane.addEventListener("input", afiseazaRezultat);

    afiseazaRezultat();
});

    function info() {
        alert("Numărul de locuri a fost confirmat");
    }