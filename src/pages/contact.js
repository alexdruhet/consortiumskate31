import React from 'react'
import ContactForm from '../components/contact-form'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/hero'

class ContactPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Seo title="Écrivez-nous" />
        <Hero title="Écrivez-nous" />
        <ContactForm />
      </Layout>
    )
  }
}

export default ContactPage

