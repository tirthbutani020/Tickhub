const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000';

async function testSignup() {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'testpassword123',
                phone: '1234567890'
            })
        });
        const data = await response.json();
        console.log('Signup Response:', data);
        return data;
    } catch (error) {
        console.error('Signup Error:', error);
    }
}

async function testLogin() {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'testpassword123'
            })
        });
        const data = await response.json();
        console.log('Login Response:', data);
        return data;
    } catch (error) {
        console.error('Login Error:', error);
    }
}

async function testProtectedRoute(token) {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('Protected Route Response:', data);
    } catch (error) {
        console.error('Protected Route Error:', error);
    }
}

async function runTests() {
    console.log('Testing Signup...');
    await testSignup();
    
    console.log('\nTesting Login...');
    const loginData = await testLogin();
    
    if (loginData && loginData.token) {
        console.log('\nTesting Protected Route...');
        await testProtectedRoute(loginData.token);
    }
}

runTests(); 