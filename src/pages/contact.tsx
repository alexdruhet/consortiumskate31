import React from 'react'
import type { PageProps } from "gatsby"
import Layout from '../components/layout'
import ContactForm from '../components/contact-form'
import PageContainer from "../components/page-container"
import SEO from '../components/seo'

const title: string = `Écrivez-nous`;
const description: string = `Que ce soit pour rejoindre l'initiative ou autre, la discussion commence ici.`;

const ContactPage = ({ location }: PageProps) => {
  return (
    <Layout location={location}>
      <PageContainer>
        <SEO title={title} description={description} />
        <h1 className="page-title">{title}</h1>
        <p className="lead">{description}</p>
        <ContactForm />
      </PageContainer>
    </Layout>
  )
}

export default ContactPage