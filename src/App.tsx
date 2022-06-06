import React, { useState } from 'react';
import validator from 'validator';


const initState = { email: '', password: '', confirmPassword: '' }

function App() {

  const [state, setState] = useState(initState);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validator.isEmail(state.email)){
      setError('the email you input is invalid');
    }
    else if(state.password.length < 6){
      setError('the password you input must be at least 6 characters long');
    }
    else if(state.password !== state.confirmPassword){
      setError('the passwords do not match');
    }
    console.log(state);
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className='form-label'>Email address</label>
          <input type="text" name='email' id='email' className='form-control'
            value={state.email} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className='form-label'>Password</label>
          <input type="password" id='password' name='password' className='form-control' 
            value={state.password} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
          <input type="password" id='confirmPassword' name='confirmPassword' className='form-control'
            value={state.confirmPassword} onChange={handleChange}/>
        </div>
        <button type='submit' name='submit' className='btn bnt-primary'>Submit</button>
      </form>
      {error && <p className='text-danger'>{error}</p>}
    </div>
  );
}

export default App;
