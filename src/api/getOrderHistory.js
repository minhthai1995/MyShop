const getOrderHistory = (token) => (
  fetch('http://192.168.1.16:81/api/order_history.php',  //eslint-disable-line
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

module.exports = getOrderHistory;
