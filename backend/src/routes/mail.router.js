// Imports
const { sendMail } = require("../utils/sendMail");
const { RouterClass } = require("./routerClass");
const { mailReceiver } = require('../../process/config.js')
const cors = require('cors')

// Code
class MailRouter extends RouterClass {
  init() {
    this.post('/', ['PUBLIC'], cors({
      origin: "*"
  }), async (req, res) => {
      try {
        console.log(req.body)
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

        sendMail(mailReceiver, 'Nuevo pedido realizado', mailContent)

        res.header('Access-Control-Allow-Headers', 'content-type').sendSuccess('Correo enviado')
      } catch (error) {
        res.status(500).send('No se pudo enviar el correo')
        throw new Error(error)
      }
    })
  }
}

// Export
module.exports = MailRouter