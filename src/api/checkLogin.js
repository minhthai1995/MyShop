const checkLogin = (token) => (
  fetch('http://192.168.1.13:81/api/check_login.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
);

module.exports = checkLogin;
