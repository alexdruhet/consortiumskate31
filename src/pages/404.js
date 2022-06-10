import React from 'react'
import Layout from '../components/layout'

class Error404 extends React.Component {
  render() {
    return <Layout location={this.props.location}>Page not found</Layout>
  }
}

export default Error404
