import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import BlogLayout from "../components/BlogLayout/BlogLayout"
import SEO from "../components/SEO/SEO"

import Card from "@material/react-card"

class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <BlogLayout location={this.props.location} title={siteTitle}>
        <SEO
          title="Blog"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h1>Blog Posts</h1>
        <section className="page-main__section">
          <div className="blog-posts__container">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <Link to={node.fields.slug}>
                  <Card
                    className="mdc-card--clickable anoun-blog-card"
                    key={node.fields.slug}
                  >
                    <Img
                      className="mdc-card__media"
                      fluid={
                        node.frontmatter.featured_image.childImageSharp
                          .fluid
                      }
                    />
                    <div className="anoun-blog-card-content__container">
                      <h2>{title}</h2>
                      <small>{node.frontmatter.date}</small>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </BlogLayout>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
         query {
           site {
             siteMetadata {
               title
             }
           }
           allMarkdownRemark(
             filter: { fileAbsolutePath: { regex: "\/posts/" } }
             sort: { fields: [frontmatter___date], order: DESC }
           ) {
             edges {
               node {
                 excerpt
                 fields {
                   slug
                 }
                 frontmatter {
                   date(formatString: "MMMM DD, YYYY")
                   title
                   featured_image {
                     childImageSharp {
                       fluid(maxWidth: 1200, quality: 92) {
                         ...GatsbyImageSharpFluid_withWebp
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       `
