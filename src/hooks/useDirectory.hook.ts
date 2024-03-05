import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useDirectory = (rootDirectroyString?: string) => {
  const router = useRouter();
  const [directory, setDirectory] = useState<string>("");
  useEffect(() => {
    let root = "";
    if (rootDirectroyString) {
      root = rootDirectroyString;
    }

    setDirectory(() =>
      (router.query.history as string[])
        ? (router.query.history as string[]).join("/")
        : root
    );
  }, [rootDirectroyString, router.query.history]);
  return directory;
};

export const useDirectoryArray = (rootDirectroyString?: string) => {
  const router = useRouter();
  const [directory, setDirectory] = useState<string[]>([]);
  useEffect(() => {
    let root = "";
    if (rootDirectroyString) {
      root = rootDirectroyString;
    }
    setDirectory(() =>
      (router.query.history as string[])
        ? [(router.query.history as string[]).join("/")]
        : [root]
    );
  }, [rootDirectroyString, router.query.history]);
  return directory;
};
