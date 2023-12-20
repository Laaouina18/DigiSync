import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import React from 'react';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const Facture = ({month,year,client,prix}) => (
  <Document>
  
    <Page size="A4" style={styles.page}>
	<Text>vous avez payer le mois {month}/{year}</Text>
      <View style={styles.section}>
        <Text>client:{client}</Text>
      </View>
      <View style={styles.section}>
        <Text>prix:{prix}</Text>
      </View>
    </Page>
  </Document>
);
export default Facture;