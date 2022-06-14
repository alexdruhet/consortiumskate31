import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/hero'
import ContactForm1 from '../components/contact-form-1'

class ContactPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Seo title="Écrivez-nous" />
        <Hero title="Écrivez-nous" />
        <ContactForm1 />
      </Layout>
    )
  }
}

export default ContactPage

