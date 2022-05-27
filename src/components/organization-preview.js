import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { Link } from 'gatsby'
import Container from './container'
import * as styles from './organization-preview.module.css'

const OrganizationPreview = ({ organizations }) => {
  if (!organizations) return null
  if (!Array.isArray(organizations)) return null

  return (
    <Container>
      <ul className={styles.organizationList}>
        {organizations.map((organization) => {
          return (
            <li key={organization.id}>
            <Link to={organization.link} className={styles.link}>
            <GatsbyImage alt="" image={organization.logo?.gatsbyImageData} />
                <h2 className={styles.name}>{organization.name}</h2>
              <div>
                {organization.description?.raw && renderRichText(organization.description)}
              </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default OrganizationPreview
