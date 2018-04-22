const register = (email, name, password) => (
  fetch('http://192.168.1.11:81/api/register.php',  //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ email, name, password })
  })
  .then(res => res.text())

);

module.exports = register;