import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 50,
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#666',
  },
  dates: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 20,
  },
  clientSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  clientInfo: {
    fontSize: 12,
    color: '#666',
    lineHeight: 1.6,
  },
  paymentDetails: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#666',
  },
  paymentValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  total: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 20,
  },
});

const Facture = ({ month, year, client, prix, invoiceNumber = "INV-2024-001" }) => {
  const currentDate = new Date().toLocaleDateString('fr-FR');
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            {/* SVG Logo */}
            <svg viewBox="0 0 300 80" style={styles.logo}>
              <rect x="0" y="10" width="300" height="60" rx="8" fill="#1976D2"/>
              <text x="70" y="50" style={{ fill: '#FFFFFF', fontSize: 28, fontWeight: 'bold' }}>
                SyndicPro
              </text>
            </svg>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>FACTURE</Text>
            <Text style={styles.invoiceNumber}>N° {invoiceNumber}</Text>
            <Text style={styles.dates}>Date d'émission: {currentDate}</Text>
            <Text style={styles.dates}>Date d'échéance: {dueDate.toLocaleDateString('fr-FR')}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Client Information */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>INFORMATIONS CLIENT</Text>
          <Text style={styles.clientInfo}>
            {client}{'\n'}
            Référence Client: CLI-{year}-{String(month).padStart(2, '0')}
          </Text>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>DÉTAILS DU PAIEMENT</Text>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Période de facturation</Text>
            <Text style={styles.paymentValue}>
              {month}/{year}
            </Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Type de service</Text>
            <Text style={styles.paymentValue}>Frais de syndic</Text>
          </View>
          
          <View style={[styles.paymentRow, styles.total]}>
            <Text style={styles.totalLabel}>TOTAL À PAYER</Text>
            <Text style={styles.totalValue}>{prix} DH</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          SyndicPro - Gestion immobilière professionnelle{'\n'}
          123 Avenue Mohammed V, Casablanca, Maroc{'\n'}
          Tél: +212 522 00 00 00 | Email: contact@syndicpro.ma{'\n'}
          RC: 123456 | IF: 789012 | ICE: 001234567891234
        </Text>
      </Page>
    </Document>
  );
};

export default Facture;