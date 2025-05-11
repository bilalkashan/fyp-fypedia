// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleSuccess, handleError } from '../../toast';
// import Taskbar from '../taskbar/taskbar';
// import Futtor from '../futtor/futtor';
// import NoticeBoard from '../noticeboard/noticeboard';
// import styles from "../signup/signup.module.css"; 

// function Login() {
//     const [loginInfo, setLoginInfo] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginInfo((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { email, password } = loginInfo;
    
//         if (!email || !password) {
//             return handleError('Email and password are required');
//         }
    
//         try {
//             const url = process.env.REACT_APP_API_URL || 'http://localhost:8080/auth/login'; 
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
    
//             const result = await response.json();
    
//             if (result.success) {
//                 handleSuccess(result.message);
    
//                 const userData = {
//                     name: result.name,
//                     email: result.email,
//                     role: result.role,
//                     success: result.success
//                 };
    
//                 localStorage.setItem('token', result.jwtToken);
//                 localStorage.setItem('role', result.role); // <-- store role separately
//                 localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
//                 // Redirect based on role
//                 setTimeout(() => {
//                     if (result.role === "admin") {
//                         navigate('/adminDashboard');
//                     } else if (result.role === "student") {
//                         navigate('/userdashboard');
//                     } else if (result.role === "teacher") {
//                         navigate('/teacherDashboard');
//                     } else {
//                         handleError("Unknown role received.");
//                     }
//                 }, 1000);
    
//             } else {
//                 handleError(result.error || result.message);
//             }
//         } catch (err) {
//             handleError("Network error. Please try again.");
//         }
//     };
    

//     return (
//         <>
//             <Taskbar />
//             <div className={styles.page}> 
//                 <NoticeBoard />
//                 <div className={styles.container}> 
//                     <h1>Login</h1>
//                     <form onSubmit={handleLogin}>
//                         <div>
//                             <label htmlFor="email">Email</label>
//                             <input
//                             type="email"
//                             name="email"
//                             onChange={handleChange}
//                             placeholder="Enter your email..."
//                             value={loginInfo.email}
//                         />

//                         </div>
//                         <div>
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 onChange={handleChange}
//                                 placeholder="Enter your password..."
//                                 value={loginInfo.password}
//                             />

//                         </div>
//                         <button type="submit">Login</button>
//                         <span>Don't have an account? <Link to="/signup">Signup</Link></span>
//                         <span><Link to="/forgetpassword">Forget Password</Link></span>
//                     </form>
//                     <ToastContainer />
//                 </div>
//             </div>
//             <Futtor />
//         </>
//     );
// }

// export default Login;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../../toast';
import Taskbar from '../taskbar/taskbar';
import Futtor from '../futtor/futtor';
import NoticeBoard from '../noticeboard/noticeboard';
import styles from "../signup/signup.module.css"; 

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
    
        if (!email || !password) {
            return handleError('Email and password are required');
        }
    
        try {
            const url = process.env.REACT_APP_API_URL || 'http://localhost:8080/auth/login'; 
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
    
            const result = await response.json();
    
            if (result.success) {
                handleSuccess(result.message);
                const userData = {
                    name: result.name,
                    email: result.email,
                    role: result.role,
                    success: result.success
                };
    
                localStorage.setItem('token', result.jwtToken);
                localStorage.setItem('role', result.role); 
                localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
                // Redirect based on role
                setTimeout(() => {
                    if (result.role === "admin") {
                        navigate('/adminDashboard');
                    } else if (result.role === "student") {
                        navigate('/userdashboard');
                    } else if (result.role === "teacher") {
                        navigate('/teacherDashboard');
                    } else {
                        handleError("Unknown role received.");
                    }
                }, 1000);
    
            } else {
                handleError(result.error || result.message);
            }
        } catch (err) {
            handleError("Network error. Please try again.");
        }
    };
    

    return (
        <>
            <Taskbar />
            <div className={styles.page}> 
                <NoticeBoard />
                <div className={styles.container}> 
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            value={loginInfo.email}
                        />
                        </div>
                        <div>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter your password..."
                                value={loginInfo.password}
                            />

                        </div>
                        <button type="submit" className={styles.submitButton}>Login</button>
                        <span className={styles.bottomhead}>Don't have an account? <Link to="/signup">Signup</Link></span>
                        <span className={styles.bottomhead}><Link to="/forgetpassword">Forget Password</Link></span>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            <Futtor />
        </>
    );
}

export default Login;