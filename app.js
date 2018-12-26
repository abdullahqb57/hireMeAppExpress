const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const path = require('path');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));

app.set('views',path.join(__dirname + "/public"))

app.set("view engine","jade");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.render("index")
});

app.post('/', (req,res,next) => {

       
        let transporter = nodemailer.createTransport({
            host: 'gains.arrowsupercloud.com',
            port: 587,
            secure: false, 
            auth: {
                user: 'abdullah@abdullahking.me',
                pass:  '**********'
            }
        });

        let mailOptions = {
            from: '"Abdullah" <abdullah@abdullahking.me>', 
            to: `abdullahqb57@gmail.com, ${req.body.email}`,
            subject: 'Hire Me Acknowledgement Email from The Hacking School Bootcamper',
            text: 'Hello ?'+req.body.name, 
            html: '<b>The Following data has been acknowledged : </b>'+ "<br>"+req.body.name + "<br>"+ req.body.email+ "<br>"+req.body.service+ "<br>"+req.body.budget+ "<br>"+req.body.message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            
        });

        res.redirect('/success');
});

app.get("/success",function(req,res,next){
    res.sendFile(__dirname+"/public/sucess.html")
})
app.listen(port, (err) => {
    if(err) throw err;
    else console.log(`server connected to port ${port}`)
})
