import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

// https://nextjs.org/docs/advanced-features/custom-app

// function MyApp({ apollo, Component, pageProps, ctx }) {

//   return (
//     <Container>
//       <ApolloProvider client={apollo}>
//         <Page>
//           <Component {...pageProps} />
//         </Page>
//       </ApolloProvider>
//     </Container>
//   );
// }

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getStaticProps(ctx) {
// Call an external API endpoint to get posts.
// You can use any data fetching library
// const res = await fetch('https://.../posts')
// const posts = await res.json()

// By returning { props: posts }, the Blog component
// will receive `posts` as a prop at build time
//   return {
//     props: {
//       // posts,
//       ctx
//     },
//   }
// }

// ___________________________________________________________

// wes' version

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps;
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
