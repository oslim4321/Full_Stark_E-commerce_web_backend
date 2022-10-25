


let errors = { username: '', email: '', password: '' }

module.exports.handleErr = (err) => {
  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })

    return errors
  }
  if (err.code === 11000) {
    errors.email = 'This Email Already Existed'
    return errors
  }


}

module.exports.handleLoginErr = (err) => {
  if (err.message === 'Incorrect Email') {
    errors.email = 'Incorrect Email'
  }
  if (err.message === 'Incorrect password') {
    errors.password = 'Incorrect password'
  }
  /* Login err End*/


  return errors

}