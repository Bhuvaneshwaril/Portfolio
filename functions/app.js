const express = require('express');
const serverless = require("serverless-http");
const router = express.Router();
const app = express()

const nodemailer = require('nodemailer');

// const PORT = 5000;

app.use(express.static('public'));
app.use(express.json())

router.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'selvamgokul555@gmail.com',
            pass: 'bqlkvepntqtacqhr'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'selvamgokul555@gmail.com',
        subject: `Message from ${req.body.email} Hi iam ${req.body.name}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log("Email sent:" + info.response);
            res.send("success")
        }
    })
})

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`)
// })

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);