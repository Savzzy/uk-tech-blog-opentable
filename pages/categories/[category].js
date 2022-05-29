import Head from "next/head";
import ErrorPage from "next/error";
import PageContainer from "components/PageContainer";
import { getCategories, getPostsByCategory } from "libs/category";
import PostListSection from "components/PostListSection";

export default function CategoryPage({ category, posts }) {
  if (!category) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <PageContainer>
        <PostListSection title={category} posts={posts} />
      </PageContainer>
    </>
  );
}

export async function getStaticProps({ params: { category } }) {
  const posts = await getPostsByCategory(category);

  return {
    props: {
      category,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  };
}