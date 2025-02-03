const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Input validation
    if (!number || isNaN(number) || !Number.isInteger(+number)) {
        return res.status(400).json({ number: number || "", error: true });
    }

    const num = parseInt(number);
    const properties = [];
    const funFact = await axios.get(`http://numbersapi.com/${num}/math?json`);

    if (isArmstrong(num)) {
        properties.push('armstrong');
    }
    properties.push(num % 2 === 0 ? 'even' : 'odd');

    const response = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: false, // Placeholder, implement if needed
        properties,
        digit_sum: digitSum(num),
        fun_fact: funFact.data.text,
    };

    res.json(response);
});

app.use(cors());
app.use(express.json());

// Function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
};

// Function to calculate the sum of digits
const digitSum = (num) => {
    return num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
};

// API endpoint
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Input validation
    if (!number || isNaN(number) || !Number.isInteger(+number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number);
    const properties = [];
    const funFact = await axios.get(`http://numbersapi.com/${num}/math?json`);

    if (isArmstrong(num)) {
        properties.push('armstrong');
    }
    properties.push(num % 2 === 0 ? 'even' : 'odd');

    const response = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: false, // Placeholder, implement if needed
        properties,
        digit_sum: digitSum(num),
        fun_fact: funFact.data.text,
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});