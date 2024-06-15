document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const claimForm = document.getElementById('claimForm');

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
            const description = document.getElementById('description').value;
            const images = document.getElementById('images').files;
            const formData = new FormData();
            formData.append('description', description);
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
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

    if (window.location.pathname.endsWith('claims.html')) {
        fetchClaims();
    }
});

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
            listItem.textContent = `${claim.description} - ${claim.status}`;
            claimsList.appendChild(listItem);
        });
    } catch (error) {
        alert('Error fetching claims');
    }
}
