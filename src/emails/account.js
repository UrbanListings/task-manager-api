const sgMail = require('@sendgrid//mail')

const sendgridAPIKey ='process.env.SENDGRID_API_KEY'
// ######################################################################
// #########  SendGrid Environment SetUp ################################
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail =(email, name) => {

    sgMail.send({
        to: 'gaurav.best2015@gmail.com',
        from: 'techmanager20@gmail.com',
        subject: 'Hautel.Travel is successful!',
        text: 'Welcome , ${name}. I hope this acutal is becoming Reality!'
    })
    
    }
    
    module.exports = {
        sendWelcomeEmail
        
    }

