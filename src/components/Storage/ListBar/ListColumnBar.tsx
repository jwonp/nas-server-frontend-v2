const ListColumnBar = () => {
  return (
    <div className="w-full grid grid-cols-16 mt-4 py-2 border-y-2">
      <div className="col-span-7 indent-3 text-white text-lg font-semibold font-['Inter']">
        이름
      </div>
      <div className="col-span-2  text-center text-white text-lg font-semibold font-['Inter']">
        소유자
      </div>
      <div className="col-span-2 text-center text-white text-lg font-semibold font-['Inter']">
        업로드 날짜
      </div>
      <div className="col-span-2 text-center text-white text-lg font-semibold font-['Inter']">
        파일 크기
      </div>
    </div>
  );
};

export default ListColumnBar;
