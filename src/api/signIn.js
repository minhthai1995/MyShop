const signIn = (email, password) => (
  fetch('http://192.168.1.13:81/api/login.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())

);

module.exports = signIn;
