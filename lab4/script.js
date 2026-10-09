const fructe = ["Măr", "Pară", "Banana", "Portocală", "Kiwi"];
console.log(fructe);
console.log("primul:", fructe[0]);
console.log("ultimul:", fructe[fructe.length - 1]);
console.log("lungime:", fructe.length);

const orase = ["Chișinău", "Bălți", "Cahul"];
orase.push("Orhei");
orase.unshift("Soroca");
orase.pop();
orase.shift();
console.log(orase);

const produse = ["Pâine", "Lapte", "Ouă"];
const input = document.getElementById("produs");
const lista = document.getElementById("lista");

function afiseazaLista() {
  lista.textContent = "";
  if (produse.length === 0) {
    const spanGol = document.createElement("span");
    spanGol.className = "gol";
    spanGol.textContent = "Lista este goală!";
    lista.appendChild(spanGol);
  } else {
    lista.textContent = produse.join(" | ");
  }
}

function adaugaProdus(metoda) {
  const text = input.value.trim();
  if (text !== "") {
    if (metoda === "sfarsit") produse.push(text);
    else produse.unshift(text);
  }
  input.value = "";
  afiseazaLista();
}

document.getElementById("btnSfarsit").onclick = () => 
  adaugaProdus("sfarsit");
document.getElementById("btnInceput").onclick = () => 
  adaugaProdus("inceput");

document.getElementById("btnPrimul").onclick = () => {
  produse.shift();
  afiseazaLista();
};

document.getElementById("btnUltimul").onclick = () => {
  produse.pop();
  afiseazaLista();
};

afiseazaLista();

let elevi = [
  { nume: "Popescu Ana", varsta: 17, nota: 9 },
  { nume: "Rusu Mihai", varsta: 18, nota: 8 },
  { nume: "Ciobanu Maria", varsta: 17, nota: 10 }
];

const catalog = document.getElementById("catalog");
const numar = document.getElementById("numar");
const rezultat = document.getElementById("rezultat");
const mesajSterge = document.getElementById("mesajSterge");

const afiseazaElevi = () => {
  catalog.textContent = "";
  numar.textContent = elevi.length;

  elevi.forEach((elev, i) => {
    const div = document.createElement("div");
    div.className = "elev";

    const strong = document.createElement("strong");
    strong.textContent = `${i + 1}. ${elev.nume}`;

    div.appendChild(strong);
    div.append(`Vârsta: ${elev.varsta}`);
    div.appendChild(document.createElement("br"));
    div.append(`Nota: ${elev.nota}`);

    catalog.appendChild(div);
  });
};

const cauta = (nume) => elevi.find(e => e.nume.toLowerCase() === nume.toLowerCase());

document.getElementById("btnAdauga").onclick = () => {
  const nume = document.getElementById("nume").value.trim();
  const varsta = Number(document.getElementById("varsta").value);
  const nota = Number(document.getElementById("nota").value);

  if (!nume || varsta <= 0 || nota < 1 || nota > 10) {
    alert("Completează corect toate câmpurile!");
    return;
  }

  elevi.push({ nume, varsta, nota });

  document.getElementById("nume").value = "";
  document.getElementById("varsta").value = "";
  document.getElementById("nota").value = "";
  afiseazaElevi();
};

document.getElementById("btnSterge").onclick = () => {
  const nume = document.getElementById("numeSterge").value.trim();
  const elev = cauta(nume);

  if (elev) {
    elevi.splice(elevi.indexOf(elev), 1);
    mesajSterge.className = "mesaj ok";
    mesajSterge.textContent = "Elevul a fost șters!";
    document.getElementById("numeSterge").value = "";
    afiseazaElevi();
  } else {
    mesajSterge.className = "mesaj eroare";
    mesajSterge.textContent = "Elevul nu a fost găsit!";
  }
};

document.getElementById("btnCauta").onclick = () => {
  const nume = document.getElementById("numeCauta").value.trim();
  const elev = cauta(nume);

  rezultat.textContent = "";
  const span = document.createElement("span");

  if (elev) {
    span.className = "ok";
    span.textContent = "Elev găsit!";
    rezultat.appendChild(span);
    rezultat.appendChild(document.createElement("br"));
    rezultat.append(`Nume: ${elev.nume}`);
    rezultat.appendChild(document.createElement("br"));
    rezultat.append(`Vârsta: ${elev.varsta}`);
    rezultat.appendChild(document.createElement("br"));
    rezultat.append(`Nota: ${elev.nota}`);
  } else {
    span.className = "eroare";
    span.textContent = "Elevul nu a fost găsit!";
    rezultat.appendChild(span);
  }
};

afiseazaElevi();