import { FILE_LIST_ERROR_LOAD_FILES } from "@/utils/strings";

const LoadingErrorAlert = () => {
  return (
    <article className="flex py-10">
      <div className="mx-auto">
        <div className="flex">
          <p className="leading-7 text-xl">{FILE_LIST_ERROR_LOAD_FILES}</p>
        </div>
      </div>
    </article>
  );
};

export default LoadingErrorAlert;
