import * as React from "react"
import { WindowLocation } from "@reach/router"
import { Link } from "gatsby"
import Layout from "../components/layout"
import PageContainer from "../components/page-container"

const NotFoundPage = (props: { location: WindowLocation<unknown> }) => {
  return (
    <Layout location={props.location}>
      <PageContainer>
        <h1 className="page-title">Erreur 404</h1>
        <p>Désolé, la page que vous recherchez est introuvable
          <br />
          <Link to="/" className="button">retour à l'accueil</Link>
        </p>
      </PageContainer>
    </Layout>
  )
}

export default NotFoundPage
