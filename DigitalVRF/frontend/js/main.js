document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const formForm = document.getElementById('formForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const res = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'form.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error logging in');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const res = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, role })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('User registered successfully');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error registering user');
            }
        });
    }

    if (formForm) {
        formForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formForm);
            try {
                const res = await fetch('/api/forms', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });
                const data = await res.json();
                if (res.ok) {
                    window.location.href = 'admin.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error submitting form');
            }
        });
    }

    if (window.location.pathname.endsWith('admin.html')) {
        fetchForms();
    }
});

// Function to fetch all vehicle release forms
async function fetchForms() {
    try {
        const res = await fetch('/api/forms', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const forms = await res.json();
        const formsList = document.getElementById('formsList');
        formsList.innerHTML = '';
        forms.forEach(form => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <strong>${form.makeModel} (${form.vin})</strong>
                    <button onclick="downloadPDF('${form._id}')">Download PDF</button>
                </div>
                <div>
                    MVA: ${form.mva} <br>
                    Color: ${form.color} <br>
                    Miles: ${form.miles} <br>
                    PO Number: ${form.poNumber} <br>
                    Sold To: ${form.soldTo}
                </div>
            `;
            formsList.appendChild(listItem);
        });
    } catch (error) {
        alert('Error fetching forms');
    }
}

// Function to download a PDF of a specific vehicle release form
async function downloadPDF(id) {
    const res = await fetch(`/api/forms/${id}/pdf`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
