document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const claimForm = document.getElementById('claimForm');
    const editClaimForm = document.getElementById('editClaimForm');
    const emailTemplateForm = document.getElementById('emailTemplateForm');
    const templateList = document.getElementById('templateList');

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
                    window.location.href = 'claims.html';
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
            try {
                const res = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'claims.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error registering');
            }
        });
    }

    if (claimForm) {
        claimForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(claimForm);
            try {
                const res = await fetch('/api/claims', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });
                const data = await res.json();
                if (res.ok) {
                    window.location.href = 'claims.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error submitting claim');
            }
        });
    }

    if (editClaimForm) {
        editClaimForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(editClaimForm);
            const claimId = new URLSearchParams(window.location.search).get('id');
            try {
                const res = await fetch(`/api/claims/${claimId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });
                const data = await res.json();
                if (res.ok) {
                    window.location.href = 'claims.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error updating claim');
            }
        });

        const populateEditForm = async () => {
            const claimId = new URLSearchParams(window.location.search).get('id');
            try {
                const res = await fetch(`/api/claims/${claimId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    document.getElementById('renterName').value = data.renterName;
                    document.getElementById('renterEmail').value = data.renterEmail;
                    document.getElementById('renterPhone').value = data.renterPhone;
                    document.getElementById('description').value = data.description;
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error fetching claim details');
            }
        };

        populateEditForm();
    }

    if (emailTemplateForm) {
        emailTemplateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const templateName = document.getElementById('templateName').value;
            const subject = document.getElementById('subject').value;
            const body = document.getElementById('body').value;
            try {
                const res = await fetch('/api/email-templates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ templateName, subject, body })
                });
                const data = await res.json();
                if (res.ok) {
                    loadTemplates();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error saving template');
            }
        });

        const loadTemplates = async () => {
            try {
                const res = await fetch('/api/email-templates', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const templates = await res.json();
                templateList.innerHTML = '';
                templates.forEach(template => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${template.templateName} - ${template.subject}`;
                    templateList.appendChild(listItem);
                });
            } catch (error) {
                alert('Error fetching templates');
            }
        };

        loadTemplates();
    }

    if (window.location.pathname.endsWith('claims.html')) {
        fetchClaims();
    }
});

// Function to fetch all vehicle release forms
async function fetchClaims() {
    try {
        const res = await fetch('/api/claims', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const claims = await res.json();
        const claimsList = document.getElementById('claimsList');
        claimsList.innerHTML = '';
        claims.forEach(claim => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <strong>${claim.renterName} - ${claim.description}</strong>
                    <label for="templateSelect-${claim._id}">Email Template:</label>
                    <select id="templateSelect-${claim._id}">
                        <option value="">Select Template</option>
                    </select>
                    <button onclick="editClaim('${claim._id}')">Edit</button>
                    <button onclick="downloadPDF('${claim._id}')">Download PDF</button>
                    <button onclick="sendEmail('${claim._id}')">Send Email</button>
                </div>
            `;
            claimsList.appendChild(listItem);
            loadTemplatesForClaim(claim._id);
        });
    } catch (error) {
        alert('Error fetching claims');
    }
}

async function loadTemplatesForClaim(claimId) {
    try {
        const res = await fetch('/api/email-templates', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const templates = await res.json();
        const templateSelect = document.getElementById(`templateSelect-${claimId}`);
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.templateName;
            option.textContent = template.templateName;
            templateSelect.appendChild(option);
        });
    } catch (error) {
        alert('Error fetching templates');
    }
}

// Function to download a PDF of a specific vehicle release form
async function downloadPDF(id) {
    const res = await fetch(`/api/claims/${id}/pdf`, {
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

// Function to navigate to the edit claim page
function editClaim(id) {
    window.location.href = `edit-claim.html?id=${id}`;
}

// Function to send an email using a selected template
async function sendEmail(id) {
    const templateSelect = document.getElementById(`templateSelect-${id}`);
    const templateName = templateSelect.value;
    if (!templateName) {
        alert('Please select a template');
        return;
    }
    try {
        const res = await fetch(`/api/email-templates/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ claimId: id, templateName })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Email sent successfully');
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error sending email');
    }
}
