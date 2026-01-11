import fetch from 'node-fetch';

async function testRegister() {
  try {
    const response = await fetch('http://localhost:5173/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'test123'
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testRegister();