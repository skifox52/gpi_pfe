import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-18-pdf/renderer"

//create style
const style = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

//create document componenet
const myDocument = () => (
  <Document>
    <Page size="A4" style={style.page}>
      <View style={style.section}>
        <Text>Section 1</Text>
      </View>
      <View style={style.section}>
        <Text>Section 1</Text>
      </View>
    </Page>
  </Document>
)

export default myDocument
