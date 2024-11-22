import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import * as nodemailer from 'nodemailer'; // Import Nodemailer
import { SentMessageInfo } from 'nodemailer'; // Import type

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // MailDev ne supporte pas SSL/TLS
});

// Fonction pour envoyer un e-mail
function sendTestEmail() {
  const mailOptions = {
    from: '"Nom de l\'expéditeur" <expediteur@example.com>',
    to: 'destinataire@example.com',
    subject: 'Test MailDev',
    text: "Ceci est un test d'e-mail avec MailDev.",
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        return;
      }
      console.log('E-mail envoyé avec succès :', info.messageId);
    }
  );
}

// Appeler la fonction d'envoi d'e-mail lors du démarrage du serveur
sendTestEmail();

// Configuration de l'application Angular Universal
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
