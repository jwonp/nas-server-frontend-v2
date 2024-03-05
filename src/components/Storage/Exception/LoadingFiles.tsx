import { FILE_LIST_LOADING } from "@/utils/strings";

const LoadingFiles = () => {
  return (
    <article className="flex py-10">
      <div className="mx-auto">
        <div className="flex">
          <p className="leading-7 text-xl">{FILE_LIST_LOADING}</p>
        </div>
      </div>
    </article>
  );
};
export default LoadingFiles;
