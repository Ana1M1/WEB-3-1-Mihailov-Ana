"use strict";

const CHEIE_STORAGE = "elevi";

const form = document.getElementById("form-elev");
const inputNume = document.getElementById("nume");
const inputVarsta = document.getElementById("varsta");
const inputGrupa = document.getElementById("grupa");
const inputEmail = document.getElementById("email");
const mesajEroare = document.getElementById("mesaj-eroare");
const lista = document.getElementById("lista-elevi");
const totalEl = document.getElementById("total");
const inputCautare = document.getElementById("cautare");
const btnSubmit = document.getElementById("btn-submit");
const btnAnuleaza = document.getElementById("btn-anuleaza");
const btnStergeToti = document.getElementById("btn-sterge-toti");
const formTitle = document.getElementById("form-title");

let elevi = [];         
let idInEditare = null; 

function salveazaElevi() {
  localStorage.setItem(CHEIE_STORAGE, JSON.stringify(elevi));
}

function incarcaElevi() {
  try {
    const date = localStorage.getItem(CHEIE_STORAGE);
    const parsat = date ? JSON.parse(date) : [];
    return Array.isArray(parsat) ? parsat : [];
  } catch (e) {
    return []; 
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function arataEroare(text) {
  mesajEroare.textContent = text;
  mesajEroare.classList.remove("d-none");
}

function ascundeEroare() {
  mesajEroare.classList.add("d-none");
  mesajEroare.textContent = "";
}

function valideaza(nume, varsta, grupa, email) {
  if (!nume || !varsta || !grupa || !email) {
    return "Toate câmpurile trebuie completate.";
  }
  const v = Number(varsta);
  if (isNaN(v) || v <= 0) {
    return "Vârsta trebuie să fie un număr pozitiv.";
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return "Adresa de e-mail nu are un format valid.";
  }
  return null;
}

function afiseazaElevi() {
  const termen = inputCautare.value.trim().toLowerCase();
  const filtrati = elevi.filter(e => e.nume.toLowerCase().includes(termen));

  totalEl.textContent = elevi.length;
  lista.innerHTML = "";

  if (elevi.length === 0) {
    lista.innerHTML = '<div class="col-12"><div class="mesaj-gol">Nu există elevi înregistrați</div></div>';
    return;
  }
  if (filtrati.length === 0) {
    lista.innerHTML = '<div class="col-12"><div class="mesaj-gol">Niciun elev nu corespunde căutării</div></div>';
    return;
  }

  filtrati.forEach(elev => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card card-elev h-100 ${elev.id === idInEditare ? "in-editare" : ""}">
        <div class="card-body">
          <h3 class="card-title h5">${escapeHtml(elev.nume)}</h3>
          <p class="mb-1"><strong>Vârstă:</strong> ${escapeHtml(String(elev.varsta))} ani</p>
          <p class="mb-1"><strong>Grupă/clasă:</strong> ${escapeHtml(elev.grupa)}</p>
          <p class="mb-0 email"><strong>E-mail:</strong> ${escapeHtml(elev.email)}</p>
        </div>
        <div class="card-footer bg-white border-0 d-flex gap-2 pb-3">
          <button class="btn btn-sm btn-outline-primary btn-editeaza" data-id="${elev.id}">Editează</button>
          <button class="btn btn-sm btn-danger btn-sterge" data-id="${elev.id}">Șterge</button>
        </div>
      </div>`;
    lista.appendChild(col);
  });
}

function reseteazaFormular() {
  form.reset();
  idInEditare = null;
  formTitle.textContent = "Adaugă un elev";
  btnSubmit.textContent = "Adaugă elev";
  btnAnuleaza.classList.add("d-none");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nume = inputNume.value.trim();
  const varsta = inputVarsta.value.trim();
  const grupa = inputGrupa.value.trim();
  const email = inputEmail.value.trim();

  const eroare = valideaza(nume, varsta, grupa, email);
  if (eroare) {
    arataEroare(eroare);
    return; 
  }
  ascundeEroare();

  if (idInEditare !== null) {
  
    const elev = elevi.find(e => e.id === idInEditare);
    if (elev) {
      elev.nume = nume;
      elev.varsta = Number(varsta);
      elev.grupa = grupa;
      elev.email = email;
    }
  } else {
    const elevNou = {
      id: Date.now(),
      nume: nume,
      varsta: Number(varsta),
      grupa: grupa,
      email: email
    };
    elevi.push(elevNou);
  }

  salveazaElevi();
  reseteazaFormular();
  afiseazaElevi();
});

btnAnuleaza.addEventListener("click", function () {
  ascundeEroare();
  reseteazaFormular();
  afiseazaElevi();
});

lista.addEventListener("click", function (event) {
  const btnSterge = event.target.closest(".btn-sterge");
  const btnEditeaza = event.target.closest(".btn-editeaza");

  if (btnSterge) {
    const id = Number(btnSterge.dataset.id);
    elevi = elevi.filter(e => e.id !== id); 
    if (idInEditare === id) reseteazaFormular();
    salveazaElevi();
    afiseazaElevi();
  }

  if (btnEditeaza) {
    const id = Number(btnEditeaza.dataset.id);
    const elev = elevi.find(e => e.id === id);
    if (!elev) return;
    inputNume.value = elev.nume;
    inputVarsta.value = elev.varsta;
    inputGrupa.value = elev.grupa;
    inputEmail.value = elev.email;
    idInEditare = id;
    formTitle.textContent = "Editează elevul";
    btnSubmit.textContent = "Salvează modificările";
    btnAnuleaza.classList.remove("d-none");
    ascundeEroare();
    afiseazaElevi();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

inputCautare.addEventListener("input", afiseazaElevi);

btnStergeToti.addEventListener("click", function () {
  if (elevi.length === 0) return;
  if (confirm("Sigur doriți să ștergeți toți elevii? Acțiunea nu poate fi anulată.")) {
    elevi = [];
    salveazaElevi();
    reseteazaFormular();
    afiseazaElevi();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  elevi = incarcaElevi();
  afiseazaElevi();
});