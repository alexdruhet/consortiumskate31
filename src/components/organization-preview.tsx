import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './organization-preview.module.css'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import OrganizationPreviewItem from './organization-preview-item'

const OrganizationPreview = ({ organizations }: any) => {
  if (!organizations || !Array.isArray(organizations)) return null

  return (
    <ul className={styles.organizationList}>
      {organizations.map((organization) => {
        return (
          <li key={organization.id} className={styles.organizationItem}>
            <OutboundLink href={organization.link} className={styles.link}>
              <OrganizationPreviewItem
              logo={organization.logo}
              name={organization.name}
              description={organization.description}
              />
            </OutboundLink>
          </li>
        )
      })}
    </ul>
  )
}

export default OrganizationPreview
