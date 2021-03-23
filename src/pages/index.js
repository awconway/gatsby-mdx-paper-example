import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'

export default function indexPage(){
  return(
    <Layout>
      <h1>Articles</h1>

      <ul style={{ listStyle: 'none' }}>
        <li>
          <Link to={'/manuscript'}>Article with citations</Link>
        </li>
        <li>
          <Link to={'/second-paper'}>Article with citations and no bibliography</Link>
        </li>
      </ul>
    </Layout>
)
  }