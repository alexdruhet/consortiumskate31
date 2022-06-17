import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'

interface SiteMetadata {
    site: {
        siteMetadata: {
            title: string;
            description: string;
            social?: {
                instagram?: string;
                twitter?: string;
            }
        },
    };
}

const Social = () => {
    const { site }: SiteMetadata = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
                twitter
                instagram
            }
          }
        }
      }
    `
    )

    if (!site.siteMetadata.social) return null

    return (
        <ul className="social">
            {
                Object.entries(site.siteMetadata.social).map(([name, profile]) => (
                    <li key={name}>
                        <Link to={`https://www.${name}.com/${profile.substring(1)}`}>
                            <span className="sr-only">{name}</span>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default Social
