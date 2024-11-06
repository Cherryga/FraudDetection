// // src/SignIn.js
// import React from 'react';

// const SignIn = () => {
//   return (
//     <div style={styles.container}>
//       <h2>Sign In</h2>
//       <form style={styles.form}>
//         <input type="email" placeholder="Email" style={styles.input} required />
//         <input type="password" placeholder="Password" style={styles.input} required />
//         <button type="submit" style={styles.button}>Sign In</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: { padding: '20px' },
//   form: { display: 'flex', flexDirection: 'column', gap: '10px' },
//   input: { padding: '10px', fontSize: '16px' },
//   button: {
//     padding: '10px',
//     backgroundColor: '#0066cc',
//     border: 'none',
//     color: 'white',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

// export default SignIn;


import React, { useState } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const credentials = { username, password };

        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login failed.');
                setSuccessMessage('');
            } else {
                const token = await response.json(); // Assuming your login returns a token
                localStorage.setItem('jwtToken', token); // Store the token in local storage
                setSuccessMessage('Login successful!');
                setErrorMessage('');
                // Redirect user or update UI after successful login
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={loginUser}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Sign In</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default SignIn;
