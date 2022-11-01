import React from 'react'
import type { PageProps } from "gatsby"
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './post.module.css'
import moment from 'moment'
import 'moment/locale/fr'
import PageContainer from '../components/page-container'
import OrganizationPreviewItem from '../components/organization-preview-item'
import { GatsbyImage } from 'gatsby-plugin-image'

//// @TODO: render references
//// @see https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/

const renderOptions = {
  renderNode: {
    //[INLINES.HYPERLINK]: (node, children) => {
    //  const { uri } = node.data;
    //  return (
    //    <a href={uri}>
    //      {children}
    //    </a>
    //  )
    //},
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      //console.log("ENTRY_HYPERLINK", node, children);
      //const { id, linkType, link} = node.data.target.sys;
      //if (!node.data.target) {
      //  return;
      //}
      // @TODO
      return;
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      //console.log("ASSET_HYPERLINK", node, children);
      if (!node.data.target) {
        return;
      }
      const { description, filename, title, mimeType, url } = node.data.target;
      return (
        <a href={url} className="asset" title={filename} target="_blank">
          {title} ({mimeType})
        </a>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      //console.log("INLINES.EMBEDDED_ENTRY", node, children);
      if (!node.data.target) {
        return;
      }
      // @TODO
      return;
      //if (node.data.target.sys.contentType.sys.id === "post") {
      //  return (
      //    <a href={`/blog/${node.data.target.fields.slug}`}>
      //      {node.data.target.fields.title}
      //    </a>
      //  );
      //}
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      //console.log("BLOCKS.EMBEDDED_ENTRY", node, children);
      if (!node.data.target) {
        return;
      }
      const { __typename } = node.data.target;
      if (__typename === "ContentfulOrganization") {
        const {logo, name} = node.data.target;
        return <OrganizationPreviewItem
          logo={logo}
          name={name}
          />
      }
      return;
      // @TODO
      //if (node.data.target.sys.contentType.sys.id === "codeBlock") {
      //  return (<div style={{background: "red"}}>BLOCK EMBEDDED_ENTRY CODE</div>)
      //  return (
      //    <pre>
      //      <code>{node.data.target.fields.code}</code>
      //    </pre>
      //  );
      //}
      //if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
      //  return (<div style={{background: "red"}}>BLOCK EMBEDDED_ENTRY VIDEO</div>);
      //  return (
      //    <iframe
      //      src={node.data.target.fields.embedUrl}
      //      height="100%"
      //      width="100%"
      //      frameBorder="0"
      //      scrolling="no"
      //      title={node.data.target.fields.title}
      //      allowFullScreen={true}
      //    />
      //  );
      //}
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      //console.log('EMBEDDED_ASSET', node);
      if (!node.data.target) {
        return;
      }
      const { description, gatsbyImageData, title} = node.data.target;
      return (
        <GatsbyImage image={gatsbyImageData} alt={title} />
      );
      return;
    },
  },
};

const PostTemplate = ({ location, pageContext, data }: PageProps<Queries.PostTemplateQuery>) => {

  moment.locale('fr')
  const post = data.contentfulPost
  const previous = data.previous
  const next = data.next
  const plainTextExtract = documentToPlainTextString(
    JSON.parse(post.extract.raw)
  )

  let heroImage = post.heroImage
  if (heroImage.filename === 'white.png') heroImage = null

  return (
    <Layout location={location}>
      <SEO
        title={post.title}
        description={plainTextExtract}
        image={post.heroImage.resize !== null && `http:${post.heroImage.resize.src}`}
      />
      <PageContainer>
        <Hero
          image={heroImage?.gatsbyImageData}
          title={post.title}
          content={post.extract}
        />
        <div className={styles.container}>
          <div className={"meta", styles.meta}>
            <div className={"author"}>✍️ {post.author?.name}</div>{' '}
            <time dateTime={post.rawDate} className={"date"}>
              📆 {moment(post.publishDate).format('LL')}
            </time>{' '}
            <Tags tags={post.tags} />
          </div>
          <div className={styles.article}>
            <div className={styles.body}>
            {/* <ContentfulRichText richText={post.body} /> */}
              {renderRichText(post.body, renderOptions)}
            </div>
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/articles/${previous.slug}`} rel="prev" className="button">
                        ◀︎ <span className="sr-only">{previous.title}</span>
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/articles/${next.slug}`} rel="next" className="button">
                        <span className="sr-only">{next.title}</span> ►
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </PageContainer>
    </Layout>
  )

}

export default PostTemplate

export const query = graphql`
  query PostTemplate(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
        filename
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            title
            description
            gatsbyImageData(width: 768)
            mimeType
            filename
            url
          }
          ... on ContentfulOrganization {
            __typename
            contentful_id
            name
            link
            logo {
              gatsbyImageData(width: 293)
            }
          }
        }
      }
      tags
      extract {
        raw
      }
    }
    previous: contentfulPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`