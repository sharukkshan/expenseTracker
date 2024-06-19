document.getElementById('ai').addEventListener('click', function() {
    document.getElementById('chart').style.display = 'none';
    document.getElementById('aiInterface').style.display = 'block';
});

document.getElementById('home').addEventListener('click', function() {
    document.getElementById('aiInterface').style.display = 'none';
    document.getElementById('chart').style.display = 'block';
});

document.getElementById('chartbtn').addEventListener('click', function() {
    document.getElementById('aiInterface').style.display = 'none';
    document.getElementById('chart').style.display = 'block';
});


document.getElementById('home').addEventListener('click', function() {
   // window.location.href = './index.html';
   location.reload();
}); 

document.getElementById('tax').addEventListener('click', function() {
    window.location.href = '../Tax/tax.html';
 }); 

 document.getElementById('logout').addEventListener('click', function() {
    window.location.href = '../index.html';
 }); 

// Selecting elements
const totalIncomeElement = document.getElementById('totalIncome');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const selectIncomeOption = document.getElementById('selectIncomeOption');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const submitButton = document.getElementById('submit');
const numberOfTransactions = document.getElementById('numberOfTransactions');

// Initialize total balance, income, and expense
let totalBalance = 0;
let totalIncome = 0;
let totalExpense = 0;

// Function to update total balance, income, and expense
function updateBalance() {
    totalBalance = totalIncome - totalExpense;
    totalIncomeElement.textContent = `$ ${totalBalance}`;
    incomeElement.textContent = `$ ${totalIncome}`;
    expenseElement.textContent = `$ ${totalExpense}`;
}

// Function to add a transaction entry
function addTransaction(type, amount) {
    const transactionEntry = document.createElement('div');
    transactionEntry.innerHTML = `
        <div class="transactionsleftCard">
            <p class="entries">CTS</p>
            <p class="inc">${type.toUpperCase()}</p>
        </div>
        <div>
            <p class="entries ${type === 'income' ? 'income' : 'expense'}">
                <span>${type === 'income' ? '+' : '-'}</span>
                ${amount}
            </p>
        </div>
    `;
    numberOfTransactions.appendChild(transactionEntry);
}

// Event listener for submit button
submitButton.addEventListener('click', function() {
    const type = selectIncomeOption.value;
    const amount = parseFloat(amountInput.value);
    
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Update total income or expense
    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }

    // Update total balance
    updateBalance();

    // Add transaction entry
    addTransaction(type, amount);

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
});

// CHART

// Function to update the pie chart
function updateChart() {
    // Get input values
    const income = parseFloat(document.getElementById('income').textContent.slice(2));
    const expense = parseFloat(document.getElementById('expense').textContent.slice(2));

    // Calculate data for the chart
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [{
            label: 'Income vs Expense',
            data: [income, expense],
            backgroundColor: ['green', 'red']
        }]
    };

    // Get canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Clear previous chart instance if any
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Create new chart instance
    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true
        }
    });
}

// Initial chart update
updateChart();

// Event listener for input fields
document.getElementById('description').addEventListener('input', function() {
    // Call updateChart function to update the chart with new input values
    updateChart();
});

document.getElementById('amount').addEventListener('input', function() {
    // Call updateChart function to update the chart with new input values
    updateChart();
});

// AI
document.getElementById('ai').addEventListener('click', function() {
    document.getElementById('chatbotContainer').style.display = 'block';
});

document.getElementById('closeChatbot').addEventListener('click', function() {
    document.getElementById('chatbotContainer').style.display = 'none';
}); 
