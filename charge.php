<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$amount = $data['amount'] ?? 0;

if($amount < 1){
    echo json_encode(['status'=>'error','message'=>'Amount must be at least ₱1']);
    exit;
}

$client_id = 'YOUR_SANDBOX_CLIENT_ID';
$secret_key = 'YOUR_SANDBOX_SECRET_KEY';

$url = "https://sandbox.hitpayapp.com/v1/charges";

$order_data = [
    "amount" => $amount,
    "currency" => "PHP",
    "payment_method" => "gcash",
    "description" => "Test GCash Payment",
    "redirect_url" => "http://localhost/hitpay_sandbox/success.html"
];

$headers = [
    "Content-Type: application/json",
    "Authorization: Basic " . base64_encode("$client_id:$secret_key")
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order_data));
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if(isset($result['id'])){
    echo json_encode(['status'=>'success','order_id'=>$result['id'],'amount'=>$amount]);
} else {
    echo json_encode(['status'=>'error','message'=>$result['message'] ?? 'Unknown error']);
}
?>
