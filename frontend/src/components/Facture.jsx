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

const Facture = ({app}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>client:</Text>
      </View>
	  <View style={styles.section}>
        <Text>appartement:</Text>
      </View>
      <View style={styles.section}>
        <Text>prix:</Text>
      </View>
    </Page>
  </Document>
);
export default Facture;