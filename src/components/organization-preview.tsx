import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './organization-preview.module.css'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const OrganizationPreview = ({ organizations }: any) => {
  if (!organizations || !Array.isArray(organizations)) return null

  return (
    <ul className={styles.organizationList}>
      {organizations.map((organization) => {
        return (
          <li key={organization.id} className={styles.organizationItem}>
            <OutboundLink href={organization.link} className={styles.link}>
              {organization.logo && (
                <GatsbyImage
                  alt=""
                  image={organization.logo.gatsbyImageData}
                />
              )}
              <h2 className="item-title">{organization.name}</h2>
              <div className="item-description">
                {organization.description?.raw &&
                  renderRichText(organization.description)}
              </div>
            </OutboundLink>
          </li>
        )
      })}
    </ul>
  )
}

export default OrganizationPreview
