import React, { useEffect, useState } from 'react';
import CustomButton from '../Components/CustomButton';
import '../Styles/Login.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateUserData } = useAuth()
  const navigate = useNavigate()
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotes = [
    "Shop smart, live better with SD ShoppingKart!",
    "Your one-stop destination for all your shopping needs.",
    "Discover deals that delight at SD ShoppingKart!",
    "Where quality meets affordability—shop now!",
    "Find what you love, love what you find at SD ShoppingKart.",
    "Bringing you the joy of effortless shopping every day!",
    "SD ShoppingKart: Where your cart is always full of happiness.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormValid = name.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    if (!isFormValid) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== 'Test@123') {
      setError('Please enter the correct password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      updateUserData({ data: name, date: new Date() })
      navigate('/in')
    }, 1000);
  };

  return (
    <div className="row w-100 login m-0">
      <div className="col-md-8 content">
        <div>
          <div className='shopping'>SD ShoppingKart</div>
          <div className='fw-bold  text-center fontItalic'>{quotes[currentQuoteIndex]}</div>
        </div>
      </div>
      <div className="col-md-4 content">
        <div className="EmailLogin ">
          <div className="text-center">
            <h2 className="mb-4 text-dark">Login</h2>
          </div>
          <div className="my-4">
            <label htmlFor="nameInput" className="form-label">
              Enter Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="form-control"
              id="nameInput"
              autocomplete="off"
              value={name}
              onChange={(e) => {
                setError('');
                setName(e.target.value);
              }}
            />
          </div>
          <div className="my-4">
            <label htmlFor="passwordInput" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className="login-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="form-control"
                id="passwordInput"
                autocomplete="off"
                value={password}
                onChange={(e) => {
                  setError('');
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (isFormValid)
                      handleLogin();
                  }
                }}
              />
              <span
                className="material-symbols-outlined mail-eye-icons"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </div>
            {error && <small className="text-danger mb-3">{error}</small>}
          </div>
          <CustomButton
            isDisabled={!isFormValid}
            loading={loading}
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
