import React from 'react'
import * as styles from './pdf-preview.module.css'
import moment from 'moment'
import 'moment/locale/fr'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
//import PdfViewer from './pdf'

const PdfPreview = ({ pdfs }) => {
  if (!pdfs) return null
  if (!Array.isArray(pdfs)) return null
  moment.locale('fr')

  return (
    <ul className={styles.pdfList}>
      {pdfs.map((pdf) => {
        return (
          <li className={styles.item} key={pdf.id}>
            <h2 className={styles.title}>{pdf.title}</h2>
            <div className={styles.meta}>
              <time className="meta date" dateTime={pdf.updatedAt}>
                📆 Dernière mise à jour : {moment(pdf.updatedAt).format('LL')}
              </time>
              <OutboundLink href={pdf.url} className="button">💾 Télécharger le PDF</OutboundLink>
            </div>
            <div className={styles.description}>{pdf.description}</div>
            <div className={styles.pdfWrapper}>
              {/*<PdfViewer url={pdf.url} />*/}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default PdfPreview
