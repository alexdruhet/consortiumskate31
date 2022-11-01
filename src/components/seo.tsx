import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import defaultOgImg from "../assets/images/og-consortiumskate31.png"

interface SEOTypes {
    description?: string;
    lang?: string;
    meta?: [{
        name: string;
        content: any;
        property?: undefined;
    }] | [],
    title?: string;
    image?: string;
}

interface DefaultSiteData {
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

const SEO = ({ description, lang, meta, title, image }: SEOTypes): JSX.Element => {
    const { site }: DefaultSiteData = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
    )

    const metaDescription: string = description || site.siteMetadata.description
    const defaultTitle: string = site.siteMetadata?.title
    const defaultImage: string = image || defaultOgImg

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            defaultTitle={defaultTitle}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: `image`,
                    content: image,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:image`,
                    content: defaultImage,
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.social?.twitter || ``,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta || [])}
        />
    )
}

export default SEO
