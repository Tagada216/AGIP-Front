void function mail() {
    const nodeMailer = require('nodemailer/lib/nodemailer');

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    var mailOptions = {
        from: 'luciouh@gmail.com',
        to: 'lucie-varlet@hotmail.fr',
        subject: 'Test',
        text: 'Message',
        html: '<b>corps du mail</b>',
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    transporter.close();
};
