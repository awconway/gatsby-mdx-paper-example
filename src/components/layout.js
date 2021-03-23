import { useStaticQuery, graphql } from "gatsby"

import { Cite } from './Cite'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import references from '../references/references.bib'
import {
  BibliographyProvider
} from './BibliographyProvider'

import styled from 'styled-components'

const Main = styled.div``
const Body = styled.div``
const Article = styled.article`
  display: grid;
  grid-template: 'header sidebar' 'main sidebar';
  grid-auto-columns: auto min-content;
  margin-bottom: 32px;

  h1 {
    font-weight: 200;
  }

  > header {
    grid-area: header;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${Main} {
    grid-area: main;
    grid-row-start: 2;
    grid-row-end: -1;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${Body} {
      width: 100%;
      max-width: 65ch;
    }
  }

  > footer {
    grid-area: sidebar;
    padding: 16px;
    min-width: 20em;
  }
`


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    font-family: ${props => props.theme.font};
  }
`
//makes the citations available in all mdx
const components = { cite: Cite }


export default function LayoutPage({ children, props }) {
  const data = useStaticQuery(graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        csl
      }
    }
  }
  `)
  return (
  <>
    <GlobalStyle />
    <MDXProvider components={components}>
    <BibliographyProvider references={references} 
    citationStyle={data.mdx.frontmatter.csl}>
      <Article>
        <Main>
          <Body>
          {children}
          </Body>
        </Main>
      </Article>
    </BibliographyProvider>
    </MDXProvider>
  </>
)
  }

