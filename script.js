document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.getElementById('studentTableBody');
    
    // Load existing data from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    displayStudents();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            id: Date.now(), // Add unique ID for each record
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };

        // Add new student to array
        students.push(formData);
        
        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(students));
        
        // Update table
        displayStudents();
        
        // Reset form
        form.reset();
    });

    function displayStudents() {
        // Clear existing table rows
        tableBody.innerHTML = '';
        
        // Add each student to the table
        students.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>${student.address}</td>
                <td>
                    <button class="btn delete" data-id="${student.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add click event listeners to all delete buttons
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteStudent(id);
            });
        });
    }

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            // Filter out the student with the matching ID
            students = students.filter(student => student.id !== id);
            // Update localStorage
            localStorage.setItem('students', JSON.stringify(students));
            // Refresh the table
            displayStudents();
        }
    }
}); 