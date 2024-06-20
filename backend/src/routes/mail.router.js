// Imports
const { mailReceiver } = require('../../process/config')
const { sendMail } = require('../utils/sendMail')
const { RouterClass } = require('./routerClass')

// Code
class MailRouter extends RouterClass {
  init() {
    this.post('/', ['PUBLIC'], async (req, res) => {
      try {
        console.log(req.body);
        const { name, lastName, phoneNumber, email, products } = req.body

        let mailContent = `
              <h2>Cliente:</h2>
                <p>Nombre: ${name}</p>
                <p>Apellido: ${lastName}</p>
                <p>Teléfono: ${phoneNumber}</p>
                <p>Correo: ${email}</p>
                
                <h2>Productos:</h2>
                <ul>`

        products.forEach(product => {
          mailContent += `<li>ID: ${product.id} - Nombre: ${product.name}</li>`;
        });

        mailContent += '</ul>'

        await sendMail(mailReceiver, 'Nuevo pedido realizado', mailContent)

        res.tstaus(200).send('Correo enviado')
      } catch (error) {
        res.sendServerError(error)
        throw new Error(error)
      }
    })
  }
}

// Export
module.exports = MailRouter