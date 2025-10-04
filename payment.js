document.getElementById('payButton').addEventListener('click', function() {
  const amount = document.getElementById('amountInput').value;
  const messageBox = document.getElementById('message');
  
  if (!amount || amount <= 0) {
    messageBox.innerHTML = "⚠️ Please enter a valid amount.";
    messageBox.style.color = "red";
    return;
  }

  messageBox.innerHTML = "⏳ Creating sandbox payment... Please wait.";
  messageBox.style.color = "#2d3436";

  fetch('charge.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount })
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          messageBox.innerHTML = `✅ Sandbox payment created!<br>Order ID: ${data.order_id}`;
          messageBox.style.color = "green";
      } else {
          messageBox.innerHTML = `❌ Error: ${data.message}`;
          messageBox.style.color = "red";
      }
  })
  .catch(err => {
      messageBox.innerHTML = "❌ Network error. Check your XAMPP connection.";
      messageBox.style.color = "red";
  });
});
