document.getElementById('payButton').addEventListener('click', function() {
    fetch('charge.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 20 }) // You can change this amount
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert('Sandbox payment created! Order ID: ' + data.order_id);
            // In real scenario, redirect user to HitPay sandbox checkout
        } else {
            alert('Error: ' + data.message);
        }
    });
});

