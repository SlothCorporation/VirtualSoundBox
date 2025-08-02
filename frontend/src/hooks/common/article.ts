import { useRouter } from "next/router";

export const useCategorySlug = () => {
  const ruter = useRouter();
  const { slug } = ruter.query;

  if (typeof slug === "string") {
    return slug;
  }

  return "";
};

export const useTagSlug = () => {
  const ruter = useRouter();
  const { slug } = ruter.query;

  if (typeof slug === "string") {
    return slug;
  }

  return "";
};
