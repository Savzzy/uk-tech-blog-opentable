import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY, readFileNames, readMetadata } from "./post";

const readCategory = (fileName) => {
  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return data.tags?.map((t) => t.toLowerCase()) ?? [];
};

export const getCategories = async () => {
  const categories = readFileNames().map(readCategory).flat();
  return [...new Set(categories)];
};

export const getPostsByCategory = async (category) => {
  return readFileNames()
    .map(readMetadata)
    .filter((post) => post.tags.includes(category))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};