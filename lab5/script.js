let students = [
    {
        id: 1,
        name: "Ana Popescu",
        group: "TI-231",
        age: 19,
        specialty: "Tehnologii informaționale",
        color: "#6366f1"
    },
    {
        id: 2,
        name: "Ion Rusu",
        group: "PW-222",
        age: 21,
        specialty: "Programare web",
        color: "#10b981"
    },
    {
        id: 3,
        name: "Maria Ceban",
        group: "DG-241",
        age: 18,
        specialty: "Design grafic",
        color: "#f97316"
    },
    {
        id: 4,
        name: "Vlad Munteanu",
        group: "TI-231",
        age: 20,
        specialty: "Securitate cibernetică",
        color: "#0ea5e9"
    }
];

const studentsContainer = document.getElementById("studentsContainer");
const studentCountSpan = document.getElementById("studentCount");
const emptyMessage = document.getElementById("emptyMessage");
const studentForm = document.getElementById("studentForm");
const gapRange = document.getElementById("gapRange");
const gapValue = document.getElementById("gapValue");

function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

function getRandomColor() {
    const colors = ["#6366f1", "#10b981", "#f97316", "#0ea5e9", "#eab308", "#ec4899", "#8b5cf6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function renderStudents() {
    studentsContainer.innerHTML = "";
    
    if (students.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
        
        students.forEach(student => {
            if (!student.color) {
                student.color = getRandomColor();
            }
            
            const card = document.createElement("div");
            card.className = "student-card";
            
            card.innerHTML = `
                <div class="avatar-circle" style="background-color: ${student.color};">
                    ${getInitials(student.name)}
                </div>
                <h3 class="card-name">${student.name}</h3>
                <div class="card-info">ID: ${student.id}</div>
                <div class="card-info">Grupa: ${student.group}</div>
                <div class="card-info">Vârsta: ${student.age} ani</div>
                <div class="card-info">${student.specialty}</div>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Șterge</button>
            `;
            
            studentsContainer.appendChild(card);
        });
    }
    
    studentCountSpan.textContent = students.length;
}

studentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const group = document.getElementById("group").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const specialty = document.getElementById("specialty").value.trim();
    
    if (isNaN(age) || age < 14 || age > 100) {
        alert("Vârsta trebuie să fie un număr întreg între 14 și 100!");
        return;
    }
    
    const newStudent = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name,
        group,
        age,
        specialty,
        color: getRandomColor()
    };
    
    students.push(newStudent);
    renderStudents();
    studentForm.reset();
});

window.deleteStudent = function(id) {
    students = students.filter(student => student.id !== id);
    renderStudents();
};

document.querySelectorAll(".btn-group").forEach(group => {
    const property = group.getAttribute("data-property");
    
    group.querySelectorAll(".flex-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            group.querySelectorAll(".flex-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const value = e.target.getAttribute("data-value");
            studentsContainer.style[property] = value;
        });
    });
});

gapRange.addEventListener("input", (e) => {
    const val = e.target.value;
    gapValue.textContent = val;
    studentsContainer.style.gap = val + "px";
});

renderStudents();