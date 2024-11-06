// // src/Register.js
// import React from 'react';
// import { registerUser } from '../api';

// const Register = () => {
//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>
//       <form style={styles.form}>
//         <input type="text" placeholder="Full Name" style={styles.input} required />
//         <input type="email" placeholder="Email" style={styles.input} required />
//         <input type="password" placeholder="Password" style={styles.input} required />
//         <button type="submit" style={styles.button}>Register</button>
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

// export default Register;

import React, { useState } from 'react';
import { registerUser } from './api'; // Import the register function

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password, email };
        const response = await registerUser(userData);
        console.log(response); // Handle the response accordingly
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
