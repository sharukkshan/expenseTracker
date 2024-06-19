document.addEventListener("DOMContentLoaded", function() {
    const totalIncomeInput = document.getElementById('totalIncomeInput');
    const taxAmountSpan = document.getElementById('taxAmount');
    const leftOverSpan = document.getElementById('leftOver');
    const calcTaxButton = document.getElementById('calcTaxAmount');
    const payButton = document.getElementById('rzp-button1');
    const homeButton = document.getElementById('home');

    // Tax thresholds and rates
    const taxBrackets = [
        { threshold: 1000000, rate: 0.20 },
        { threshold: 700000, rate: 0.15 },
        { threshold: 500000, rate: 0.10 },
        { threshold: 300000, rate: 0.05 }
    ];

    function calculateTax(income) {
        let tax = 0;
        let previousThreshold = 0;

        for (let i = 0; i < taxBrackets.length; i++) {
            if (income > taxBrackets[i].threshold) {
                tax += (income - taxBrackets[i].threshold) * taxBrackets[i].rate;
                income = taxBrackets[i].threshold;
            }
        }
        return tax;
    }

    calcTaxButton.addEventListener('click', function() {
        const totalIncome = parseFloat(totalIncomeInput.value);
        const tax = calculateTax(totalIncome);
        const leftOver = totalIncome - tax;

        taxAmountSpan.textContent = ` ${tax.toFixed(2)}`;
        leftOverSpan.textContent = ` ${leftOver.toFixed(2)}`;
    });

    payButton.addEventListener('click', function() {
        const options = {
            "key": "YOUR_RAZORPAY_KEY", // Enter the Key ID generated from the Dashboard
            "amount": (parseFloat(taxAmountSpan.textContent) * 100).toFixed(0), // Amount in paise
            "currency": "INR",
            "name": "Tax Payment",
            "description": "Tax Payment Transaction",
            "image": "https://example.com/your_logo", // Optional logo
            "handler": function (response){
                alert("Payment Successful: " + response.razorpay_payment_id);
            },
            "prefill": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp = new Razorpay(options);
        rzp.open();
    });

    homeButton.addEventListener('click', function() {
        window.location.href = "../Home/index.html"; // Change this to the actual path you want to navigate to
    });
});
