import nodemailer from 'nodemailer'

export const sendEmail = async (email: string, expense: any): Promise<void> => {
  console.log(email)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tnr.rocha@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const options = {
    from: 'Thiago Rocha <tnr.rocha@gmail.com>',
    to: email,
    subject: 'New Expense',
    html: `
    <table>
      <tr>
        <th>Descrição:</th>
        <td>${expense.description}</td>
      </tr>
      <tr>
        <th>Data:</th>
        <td>${expense.data}</td>
      </tr>
      <tr>
        <th>Valor:</th>
        <td>${expense.value}</td>
      </tr>
    </table>
  `
  }
  try {
    await transporter.sendMail(options)
    process.exit()
  } catch (e) {
    console.log('Email not send, cause: ', e)
  }
}
