import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/auth.service';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const navigate = useNavigate();
    
    // if (user && user.accessToken) {
    //     // return { Authorization: 'Bearer ' + user.accessToken };
    //     return { "x-auth-token": user.accessToken };
    // } else {
    //     return {};
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

    console.log(username , email , password ) ; 

        try {
            const response = await AuthService.signup(username, email, password);
            console.log("user = " , localStorage.user);
            console.log(response);
            toast.success("Registration successful! Redirecting...");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

            // window.location.reload();


        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="Signup">
            <ToastContainer position="bottom-right" />
            <section class="vh-100" styleclass="background-color: #eee;">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" styleclass="border-radius: 25px;">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form class="mx-1 mx-md-4" onSubmit={handleRegister}>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" class="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                                        <label class="form-label" for="form3Example1c">Username</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        <label class="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}




export default Signup;
