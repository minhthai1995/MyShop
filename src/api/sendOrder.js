const sendOrder = (token, arrayDetail) => (
  fetch('http://192.168.1.13:81/api/cart.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token, arrayDetail })
  })
  .then(res => res.text())

);

module.exports = sendOrder;
