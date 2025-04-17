// Doctor can view all patients
const express = require('express');
const router = express.Router();

// Example doctor route
router.get('/', (req, res) => {
    res.send('Doctor Dashboard');
});

module.exports = router;
