
let fructe = ["Măr", "Pară", "Banana", "Portocală", "Kiwi"];
console.log(fructe);
console.log("primul:", fructe[0]);
console.log("ultimul:", fructe[fructe.length - 1]);
console.log("lungime:", fructe.length);



let orase = ["Chișinău", "Bălți", "Cahul"];
orase.push("Orhei");
orase.unshift("Soroca");
orase.pop();
orase.shift();
console.log(orase);



let produse = ["Pâine", "Lapte", "Ouă"];
let input = document.getElementById("produs");
let lista = document.getElementById("lista");

function afiseazaLista() {
  if (produse.length == 0) {
    lista.innerHTML = "<span class='gol'>Lista este goală!</span>";
  } else {
    lista.textContent = produse.join(" | ");
  }
}

document.getElementById("btnSfarsit").onclick = function () {
  let text = input.value.trim();
  if (text != "") {
    produse.push(text);
  }
  input.value = "";
  afiseazaLista();
};

document.getElementById("btnInceput").onclick = function () {
  let text = input.value.trim();
  if (text != "") {
    produse.unshift(text);
  }
  input.value = "";
  afiseazaLista();
};

document.getElementById("btnPrimul").onclick = function () {
  produse.shift();
  afiseazaLista();
};

document.getElementById("btnUltimul").onclick = function () {
  produse.pop();
  afiseazaLista();
};

afiseazaLista();


let elevi = [
  { nume: "Popescu Ana", varsta: 17, nota: 9 },
  { nume: "Rusu Mihai", varsta: 18, nota: 8 },
  { nume: "Ciobanu Maria", varsta: 17, nota: 10 }
];

let catalog = document.getElementById("catalog");
let numar = document.getElementById("numar");
let rezultat = document.getElementById("rezultat");
let mesajSterge = document.getElementById("mesajSterge");

function afiseazaElevi() {
  catalog.innerHTML = "";
  numar.textContent = elevi.length;

  elevi.forEach(function (elev, i) {
    let div = document.createElement("div");
    div.className = "elev";
    div.innerHTML = "<strong>" + (i + 1) + ". " + elev.nume + "</strong>" +
      "Vârsta: " + elev.varsta + "<br>Nota: " + elev.nota;
    catalog.appendChild(div);
  });
}

function cauta(nume) {
  return elevi.find(function (e) {
    return e.nume.toLowerCase() == nume.toLowerCase();
  });
}

document.getElementById("btnAdauga").onclick = function () {
  let nume = document.getElementById("nume").value.trim();
  let varsta = Number(document.getElementById("varsta").value);
  let nota = Number(document.getElementById("nota").value);

  if (nume == "" || varsta <= 0 || nota < 1 || nota > 10) {
    alert("Completează corect toate câmpurile!");
    return;
  }

  elevi.push({ nume: nume, varsta: varsta, nota: nota });

  document.getElementById("nume").value = "";
  document.getElementById("varsta").value = "";
  document.getElementById("nota").value = "";
  afiseazaElevi();
};

document.getElementById("btnSterge").onclick = function () {
  let nume = document.getElementById("numeSterge").value.trim();
  let elev = cauta(nume);

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

document.getElementById("btnCauta").onclick = function () {
  let nume = document.getElementById("numeCauta").value.trim();
  let elev = cauta(nume);

  if (elev) {
    rezultat.innerHTML = "<span class='ok'>Elev găsit!</span><br>" +
      "Nume: " + elev.nume + "<br>" +
      "Vârsta: " + elev.varsta + "<br>" +
      "Nota: " + elev.nota;
  } else {
    rezultat.innerHTML = "<span class='eroare'>Elevul nu a fost găsit!</span>";
  }
};

afiseazaElevi();