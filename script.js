
let enrollees = [];


function addEnrollee(firstName, middleName, lastName, age, gender, birthday, course, schoolYear) {
    const enrollee = {
        firstName,
        middleName,
        lastName,
        age,
        gender,
        birthday,
        course,
        schoolYear
    };
    enrollees.push(enrollee);
    updateTable(); 
    clearForm(); 
}


function getAllEnrollees() {
    return enrollees;
}


function updateEnrollee(index, updatedData) {
    if (index >= 0 && index < enrollees.length) {
        enrollees[index] = updatedData;
        updateTable(); 
        clearForm(); 
        return true;
    }
    return false;
}


function deleteEnrollee(index) {
    if (index >= 0 && index < enrollees.length) {
        enrollees.splice(index, 1);
        updateTable(); 
        clearForm(); 
        return true;
    }
    return false;
}


function updateTable() {
    const tableBody = document.querySelector("#enrollee-table tbody");
    tableBody.innerHTML = ''; 

    enrollees.forEach((enrollee, index) => {
        const row = tableBody.insertRow();

       
        const fields = ['firstName', 'middleName', 'lastName', 'age', 'gender', 'birthday', 'course', 'schoolYear'];
        fields.forEach(field => {
            const cell = row.insertCell();
            cell.textContent = enrollee[field];
        });

      
        const actionsCell = row.insertCell();
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editEnrolleeForm(index));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEnrollee(index));

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}


const enrollmentForm = document.getElementById("enrollment-form");

enrollmentForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const firstName = this.elements.namedItem("first-name").value;
    const middleName = this.elements.namedItem("middle-name").value;
    const lastName = this.elements.namedItem("last-name").value;
    const age = this.elements.namedItem("age").value;
    const gender = this.elements.namedItem("gender").value;
    const birthday = this.elements.namedItem("birthday").value;
    const course = this.elements.namedItem("course").value;
    const schoolYear = this.elements.namedItem("school-year").value;

    addEnrollee(firstName, middleName, lastName, age, gender, birthday, course, schoolYear);
});

const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const row = this.parentElement.parentElement;
        const cells = row.querySelectorAll("td");

        if (this.textContent === "Edit") {
            this.textContent = "Save";
            cells.forEach((cell) => {
                cell.setAttribute("contenteditable", "true");
            });
        } else {
            this.textContent = "Edit";
            cells.forEach((cell) => {
                cell.setAttribute("contenteditable", "false");
            });

            
        }
    });
});



updateTable();
