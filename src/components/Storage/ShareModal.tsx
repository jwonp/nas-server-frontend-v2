import { useState } from "react";
import ModalItem from "./Modal/ModalItem";
import SelectedModalItem from "./Modal/SelectedModalItem";
const ShareModal = () => {
  const [itemName, setItemName] = useState<string>("2019년 아동부 결산");
  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen opacity-60 bg-red-600 z-10"></div>
      <div className="fixed left-0 top-0 w-full h-screen z-20">
        <div className="flex">
          <div className="mx-auto w-2/5 max-md:w-screen">
            <div className="flex w-full h-screen">
              <div
                className="my-auto w-full h-4/5 max-md:h-screen  min-h-[512px]"
                aria-description="layout">
                <section className="w-full h-full bg-slate-500 rounded-lg max-md:rounded-none p-5">
                  <section className="h-20">
                    <p className="text-xl mb-2">{`"${itemName}" 공유`}</p>
                    <article className="w-full mb-2 h-10">
                      <input
                        className="w-full p-2 rounded-lg text-stone-950 h-full"
                        type="text"
                        placeholder="공유할 사용자의 이메일 또는 전화번호를 입력하세요."
                      />
                    </article>
                  </section>

                  <section className="mb-auto ">
                    <p className="text-xl my-2">검색 결과</p>
                    <section className="flex gap-2 mb-2 overflow-x-scroll snap-x">
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                      <SelectedModalItem text={"tkdel222@gmail.com"} />
                    </section>

                    <section className="col-span-1 mb-3 overflow-y-scroll h-32 select-none">
                      <ModalItem
                        topText={"박주원"}
                        bottomText={"tkdel222@gmail.com"}
                      />
                    </section>
                  </section>
                  <section className="float-right h-10">
                    <article className="flex gap-4">
                      <button className="leading-10">취소</button>
                      <button className="bg-blue-600 py-2 px-5 rounded-xl">
                        공유
                      </button>
                    </article>
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
