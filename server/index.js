const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');
const auth = require('./middleware/auth');

app.use(express.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/ScanNShop')
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

app.post('/user/signup', async (req, res) => {
    const {name, email, password} = req.body;
    let user = await UserModel.findOne({email: email});

    if (user) return res.send('bu mail zaten var');

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new UserModel({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();
    const token = user.createAuthToken();
    res.header('x-auth-token', token).send(user);
});

app.post('/user/login', async (req, res) => {
    const {email, password} = req.body;
    let user = await UserModel.findOne({email: email});

    if (!user) return res.send('hatalı şifre yada email');

    const isSuccess = await bcrypt.compare(password, user.password);

    if (!isSuccess) return res.send('hatalı şifre yada email');

    const token = user.createAuthToken();
    res.header('x-auth-token', token).send(true);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
