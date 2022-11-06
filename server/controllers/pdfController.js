const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs")
const PDFKit = require("pdfkit")
const PDFSvg = require("svg-to-pdfkit")

exports.postPdf = expressAsyncHandler(async (req, res) => {
  const {
    titre,
    id_req,
    type_req,
    materiel,
    nom_client,
    prenom_client,
    info_nom,
  } = req.body
  if (
    !titre ||
    !id_req ||
    !type_req ||
    !materiel ||
    !nom_client ||
    !prenom_client ||
    !info_nom
  ) {
    res.status(400)
    throw new Error("Empty fields!")
  }
  const FoldPath = path.resolve(
    __dirname,
    "../assets",
    "pdfs",
    `Document-${v4()}.pdf`
  )
  const PdfDoc = new PDFKit()
  const svg = `<svg width="80" height="80" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="160" height="160" rx="45" fill="#072E31"/>
<path d="M50.7236 51.7764C50.7236 50.7566 51.546 49.9342 52.5658 49.9342H135V25H30.1974C27.3355 25 25 27.3355 25 30.1974V72.829C25 75.6908 27.3355 78.0264 30.1974 78.0264H107.894C108.914 78.0264 109.737 78.8488 109.737 79.8685C109.737 80.8883 108.914 81.7106 107.894 81.7106H25V106.48H68.8157V110.066H25.0329V135H135V110.066H91.1839V106.48H129.803C132.664 106.48 135 104.145 135 101.283V58.8159C135 55.954 132.664 53.6184 129.803 53.6184H52.5328C51.546 53.6184 50.7236 52.7961 50.7236 51.7764Z" fill="#DBDBDB"/>
</svg>
`
  PDFSvg(PdfDoc, svg, 20, 20)
  PdfDoc.pipe(fs.createWriteStream(FoldPath, "utf-8"))
  PdfDoc.fontSize(34).text(`${titre}`, { align: "center" })
  PdfDoc.fontSize(14).text(`N° de requete : ${id_req}`, 50, 200)
  PdfDoc.text(`Type de requete : ${type_req}`, 50, 250)
  PdfDoc.text(`Matériel : ${materiel}`, 50, 300)
  PdfDoc.text(
    `Nom et prénom du client : ${nom_client?.toUpperCase()} ${prenom_client}`,
    50,
    350
  )
  PdfDoc.text(
    `Effectuer par : ${info_nom?.toUpperCase()} --  le : ${new Date()}`,
    50,
    400
  )
  PdfDoc.end()
  res.status(200).json("PDF created successfully!")
})
