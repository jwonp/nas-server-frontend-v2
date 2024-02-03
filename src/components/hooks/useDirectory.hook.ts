import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const useDirectory = (exceptionString?: string) => {
  const router = useRouter();
  const [directory, setDirectory] = useState<string>("");
  useEffect(() => {
    let exception = "";
    if (exceptionString) {
      exception = exceptionString;
    }

    setDirectory(() =>
      (router.query.history as string[])
        ? (router.query.history as string[]).join("/")
        : exception
    );
  }, [exceptionString, router.query.history]);
  return directory;
};

export const useDirectoryArray = (exceptionString?: string) => {
  const router = useRouter();
  const [directory, setDirectory] = useState<string[]>([]);
  useEffect(() => {
    let exception = "";
    if (exceptionString) {
      exception = exceptionString;
    }
    setDirectory(() =>
      (router.query.history as string[])
        ? [(router.query.history as string[]).join("/")]
        : [exception]
    );
  }, [exceptionString, router.query.history]);
  return directory;
};
