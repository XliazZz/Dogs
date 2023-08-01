const validateLogin = (userData) => {
  const errors = {};

  if(!/\S+@\S+\.\S+/.test(userData.email)){
    errors.email = 'Check your email.'
  }
  if (!userData.email) {
    errors.email = 'Enter an email.'
  }


  if((!userData.password)){
    errors.password = 'Enter an password.'
  }

  return errors;
};

export default validateLogin;