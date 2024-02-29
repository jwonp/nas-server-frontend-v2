const FileListColumnBar = () => {
  return (
    <div className="w-full min-w-[360px] grid grid-cols-16 mt-4 py-2 border-y-2 ">
      <div className="col-span-7 max-file:col-span-8 max-mobile:col-span-10 max-file:text-base indent-3 text-white text-lg font-semibold font-['Inter']">
        이름
      </div>
      <div className="col-span-2 max-md:hidden text-center text-white text-lg font-semibold font-['Inter']">
        소유자
      </div>
      <div className="col-span-2 max-md:col-span-3 max-file:col-span-3 max-file:text-base max-mobile:hidden text-center text-white text-lg font-semibold font-['Inter']">
        업로드 날짜
      </div>
      <div className="col-span-2 max-md:col-span-3 max-file:hidden text-center text-white text-lg font-semibold font-['Inter']">
        파일 크기
      </div>
    </div>
  );
};

export default FileListColumnBar;
