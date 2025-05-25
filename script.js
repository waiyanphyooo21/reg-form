document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.getElementById('studentTableBody');

    let students = JSON.parse(localStorage.getItem('students')) || [];
    displayStudents();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            subject: document.getElementById('subject').value,
            address: document.getElementById('address').value
        };

        students.push(formData);

        localStorage.setItem('students', JSON.stringify(students));

        displayStudents();

        form.reset();
    });

    function displayStudents() {
        tableBody.innerHTML = '';

        students.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>${student.gender}</td>
                <td>${student.subject}</td>
                <td>${student.address}</td>
                <td>
                    <button class="btn delete" data-id="${student.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                deleteStudent(id);
            });
        });
    }

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            students = students.filter(student => student.id !== id);
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
        }
    }
}); 