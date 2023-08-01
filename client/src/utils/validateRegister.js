const validateRegister = (userData) => {
  const errors = {};

  if (!userData.name) {
    errors.name = 'Enter an name.'
  }
  if (userData.name.length > 25) {
    errors.name = 'The name exceeds 25 characters.'
  }
  if (userData.name.length < 3) {
    errors.name = 'The name must be greater than 2 characters'
  }


  if(!/\S+@\S+\.\S+/.test(userData.email)){
    errors.email = 'Check your email.'
  }
  if (!userData.email) {
    errors.email = 'Enter an email.'
  }
  if (userData.email.length > 35) {
    errors.email = 'The email exceeds 35 characteres.'
  }


  if(!/.*\d+.*/.test(userData.password)){
    errors.password = 'It has to have at least one number.'
  }
  if(userData.password.length < 6 || userData.password.length > 10){
    errors.password = "It has to have 6 to 10 characters."
  }
  if (!/[A-Z]/.test(userData.password)) {
    errors.password = 'It has to have at least one uppercase letter.';
  }
  if (!/[a-z]/.test(userData.password)) {
    errors.password = 'It has to have at least one lowercase letter.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
    errors.password = 'It has to have at least one special character.';
  }

  return errors
};

export default validateRegister;