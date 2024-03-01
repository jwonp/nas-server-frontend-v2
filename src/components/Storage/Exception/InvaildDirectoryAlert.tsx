import { FILE_LIST_INVAILD_DIRECTORY } from "@/utils/strings";

const InvaildDirectoryAlert = () => {
  return (
    <article className="flex py-10">
      <div className="mx-auto">
        <div className="flex">
          <p className="leading-7 text-xl">{FILE_LIST_INVAILD_DIRECTORY}</p>
        </div>
      </div>
    </article>
  );
};

export default InvaildDirectoryAlert;
