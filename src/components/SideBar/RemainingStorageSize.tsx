const RemainingStorageSize = () => {
  return (
    <div className="w-full mt-4">
      <div className="indent-2 text-white text-base font-normal font-['Inter']">
        저장용량 (100% 사용중)
      </div>
      <div className="w-30 h-1  m-2  bg-green-300" />
      <div className="indent-2 text-white text-base font-normal font-['Inter']">
        5GB 중 5GB 사용
      </div>
    </div>
  );
};

export default RemainingStorageSize;
