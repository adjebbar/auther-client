import { format } from 'date-fns'

const name = 'SEAMEO-INNOTECH'

const build = certificate => {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; border: 20px solid #3f51b5; padding: 20px;">
      <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-around; align-items: center;">
        <div>
          <img src="${certificate.badge.issuer.image}" alt="${certificate.badge.issuer.name}" style="width: 200px; height: auto; margin: 0;" />
        </div>
        <div style="text-transform: uppercase;">
          <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 1.2em; text-transform: uppercase; margin: 0; margin: 0;">
            Southeast Asian Ministers of Education Organization
          </p>
          <p style="font-family: Roboto, Helvetica, Arial, sans-serif; text-transform: uppercase; font-size: 2em; margin: 0; margin: 0;">
            Regional Center for Educational<br />Innovation and Technology
          </p>
        </div>
        <div style="width: 200px;"></div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 50px;">
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; margin: 0;">
          Awards this
        </p>
        <h1 style="font-family: Roboto, Helvetica, Arial, sans-serif; text-transform: uppercase; font-size:3em; font-weight: bold; color: #3f51b5; text-shadow: 2px 2px #c8c8c8, 3px 3px #e0e0e0; margin: 0;">
          Certificate of participation
        </h1>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; margin: 0; margin-top: 20px;">
          to
        </p>
        <h2 style="font-family: Roboto, Helvetica, Arial, sans-serif; font-size:3em; font-weight: bold; font-style: italic; text-shadow: 2px 2px #c8c8c8, 3px 3px #e0e0e0; margin:0; margin-top: 10px;">
          ${certificate.recipientProfile.name}
        </h2>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-style: italic; text-align: justify; margin: 0; margin-top: 50px; margin-bottom: 20px;">
          For participating in the Massive Open Online Course (MOOC), <strong>${certificate.badge.name}</strong>
        </p>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-style: italic; text-align: justify; margin: 0; margin-bottom: 20px;">
          ${certificate.badge.description}
        </p>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; margin: 0;">
          Issued on ${format(new Date(certificate.issuedOn), 'MMMM dd, yyyy')}
        </p>
        <div>
          <img src="${certificate.badge.signatureLines[0].image}" alt="${certificate.badge.signatureLines[0].jobTile}" style="max-width: 200px; height: auto;" />
        </div>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; text-transform: uppercase; font-style: italic; margin: 0;">
          ${certificate.badge.signatureLines[0].name}
        </p>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-style: italic; margin: 0;">
          ${certificate.badge.signatureLines[0].jobTitle}
        </p>
      </div>
    </div>
  `
}

const screenshot = ''

export default {
  name,
  build,
  screenshot
}
