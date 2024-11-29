const express = require('express');
const app = express();
const userModel = require('../DB/models/user.model.js');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const userExists = await userModel.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


app.get('/users', async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/users', async (req, res) => {
    const {username} = req.body;

    try {
        const user = await userModel.findOneAndDelete( {username} );

        if (!user) {
            return res.status(400).json( {message: 'user not found'} );
        }

        return res.status(200).json({message: 'user delete succesfully'});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'user not found!' });
        }
        
        const passwordComparison = await bcrypt.compare(password, user.password);

        if (!passwordComparison) {
            return res.status(401).json({ message: 'incorrect password' });
        }

        return res.status(200).json({ message: 'login was done sucessfully' });
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

app.listen(8080, console.log('API started successfully'));