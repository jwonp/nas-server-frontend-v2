import { useState } from "react";

const ShareModal = () => {
  const [itemName, setItemName] = useState<string>("2019년 아동부 결산");
  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen opacity-60 bg-red-600 z-10"></div>
      <div className="fixed left-0 top-0 w-full h-screen z-20">
        <div className="flex">
          <div className="mx-auto w-2/5">
            <div className="flex w-full h-screen">
              <div className="my-auto w-full h-3/5">
                <section className="w-full  h-full bg-slate-500 rounded-lg p-5">
                  <div className="text-xl mb-2">{`"${itemName}" 공유`}</div>
                  <div className="w-full mb-2">
                    <input
                      className="w-full p-2 rounded-lg"
                      type="text"
                      placeholder="공유할 사용자의 이메일 또는 전화번호를 입력하세요."
                    />
                  </div>
                  <section>
                    <div>검색 결과</div>
                    <div>
                      <article></article>
                      <article></article>
                    </div>
                  </section>
                  <section className="flex gap-4 float-right mt-auto">
                    <div className="leading-10">취소</div>
                    <div className="bg-blue-600 py-2 px-5 rounded-xl">
                      <div>공유</div>
                    </div>
                  </section>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
