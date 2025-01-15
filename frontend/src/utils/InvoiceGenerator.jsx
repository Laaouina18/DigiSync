// utils/InvoiceGenerator.js
import { jsPDF } from 'jspdf';

export const generateInvoice = (payment, client, immeuble) => {
  const doc = new jsPDF();
  
  // En-tête
  doc.setFontSize(20);
  doc.text('FACTURE', 105, 20, { align: 'center' });
  
  // Informations de la facture
  doc.setFontSize(12);
  doc.text(`Facture N°: ${payment.reference}`, 20, 40);
  doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`, 20, 50);
  
  // Informations client
  doc.text('Client:', 20, 70);
  doc.text(`${client.nom} ${client.prenom}`, 40, 80);
  doc.text(`${client.email}`, 40, 90);
  doc.text(`${client.telephone}`, 40, 100);
  
  // Informations immeuble
  doc.text('Immeuble:', 20, 120);
  doc.text(`${immeuble.nom}`, 40, 130);
  doc.text(`Appartement: ${payment.appartement}`, 40, 140);
  
  // Détails du paiement
  doc.text('Détails du paiement:', 20, 160);
  doc.text(`Montant: ${payment.amount} DH`, 40, 170);
  doc.text(`Période: ${payment.period}`, 40, 180);
  
  return doc;
};