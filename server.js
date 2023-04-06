const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sendMail = require('./utils/sendMail');
const { body, validationResult } = require('express-validator');

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

//route
app.get("/", (req,res) => {
    res.send("Home Page");
});

app.post("/api/sendmail", [
    body('email').isEmail().withMessage('El correo electrónico no es válido')
], async (req,res) => {
    try { 
   
   const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsData = errors.array()
    console.log("Errores en peticion");
    console.log(errors)
     res.status(400).json({errorsData});

      
} else {
const {name, email, message } = req.body;
   console.log(name,email,message);

    const sent_from = process.env.EMAIL_USER;
    const send_to = process.env.EMAIL_TOSEND;
    const reply_to = email
    const subject = "Mensaje de Eseykon-app. Enviado por: " + name  + "(" + email + ")";
    const html = `
    <h1>Mensaje de ${name}</h1>
    <h3>${message} </h3>
    `;

    
    await sendMail(sent_from, send_to, reply_to, subject, html)
    res.status(200).json({success: true, message: "Email sent"})

}} catch (error) {
     res.status(500).json(error.message)
   }
})

const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`PORT: ${PORT}`);
    });