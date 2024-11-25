const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// Serve les fichiers statiques depuis le dossier `dist`
const distPath = path.join(__dirname, "dist/trouve-ton-artisan-tp/browser");
app.use(express.static(distPath));

// Configuration Nodemailer pour MailDev
const transporter = nodemailer.createTransport({
  host: "127.0.0.1", // MailDev fonctionne par défaut sur localhost
  port: 1025, // Port par défaut de MailDev
  secure: false, // Pas de TLS
});

// Middleware pour traiter les JSON
app.use(express.json());

// Endpoint pour envoyer un e-mail
app.post("/api/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Vérification des données reçues
  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Données incomplètes" });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Trouve Ton Artisan" <no-reply@trouve-ton-artisan.com>', // Expéditeur
      to, // Destinataire
      subject, // Sujet
      text, // Texte brut
      html, // HTML optionnel
    });

    console.log("E-mail envoyé avec succès :", info.messageId);
    res.status(200).json({
      message: "E-mail envoyé avec succès",
      id: info.messageId,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({
      error: "Erreur lors de l'envoi de l'e-mail",
    });
  }
});

// Redirige toutes les routes vers le fichier index.html (Angular SPA)
app.get("*", (req, res) => {
  const indexPath = path.join(distPath, "index.html");
  console.log("Fichier index.html recherché :", indexPath);

  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Erreur lors de l'accès au fichier index.html :", err);
      res.status(500).send("Erreur lors du chargement de l'application.");
    }
  });
});

// Configurer le port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

const fs = require("fs");
if (!fs.existsSync(path.join(distPath, "index.html"))) {
  console.error("Le fichier index.html est introuvable !");
}
