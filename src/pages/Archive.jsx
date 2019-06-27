import React from 'react'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import contentAction from '@/services/content.action'
import Post from '@/partials/Post'

const mapStateToProps = state => {
  return {
    data: state.content.posts.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAll: (payload) => {
      dispatch(contentAction.fetchArchivePosts(payload))
    }
  }
}

class Archive extends React.Component {

  state = {
    page: 1,
    order: 'created_at',
    sort: 'desc'
  }

  componentDidMount = () => {
    this.props.fetchAll({
      slug: this.props.match.params.slug,
      params: {
        page: this.state.page,
        order: this.state.order,
        sort: this.state.sort
      }
    })
  }

  render () {
    return (
      <Layout>
        {
          this.props.data.map((post, index) => {
            return <Post key={index} detail={post}></Post>
          })
        }
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
