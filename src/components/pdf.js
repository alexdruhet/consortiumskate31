import React, { useState } from 'react'
import { Document, Outline, Page } from 'react-pdf/dist/esm/entry.webpack'
import * as styles from './pdf.module.css'

export default function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber)
  }

  return (
    <>
      <Document
        className={styles.document}
        file={url}
        loading="PDF en cours de chargement&hellip;"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Outline className={styles.outline} onItemClick={onItemClick} />
        <Page className={styles.page} pageNumber={pageNumber} width="1000"/>
      </Document>
      <div className={styles.pagination}>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} sur {numPages || '--'}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Précédent
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Suivant
        </button>
      </div>
    </>
  )
}
