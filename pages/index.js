import Head from "next/head";
import { getPosts } from "libs/post";
import MainContainer from "components/MainContainer";
import PostList from "components/PostList";

export default function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <PostList posts={posts} />
      </MainContainer>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}