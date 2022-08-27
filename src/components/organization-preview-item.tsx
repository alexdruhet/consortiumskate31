import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

const OrganizationPreviewItem = ({ logo, name, description }: any) => {

  return (<div className="item organization-preview">
    {logo && (
      <GatsbyImage
        alt="logo"
        image={logo.gatsbyImageData}
      />
    )}
    <strong className="item-title">{name}</strong>
    {description && (
    <div className="item-description">
      {renderRichText(description)}
    </div>
    )}
    </div>
  )
}

export default OrganizationPreviewItem
