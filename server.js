void
function mail() {
    const nodeMailer = require('nodemailer/lib/nodemailer');

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    var mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions);
       

    transporter.close();
};