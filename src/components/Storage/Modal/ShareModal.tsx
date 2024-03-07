import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import CancelIcon from "@public/icons/close-white.svg";
import DarkCancelIcon from "@public/icons/close.svg";
import CheckedIcon from "@public/icons/checked-white.svg";
import ModalItem from "./ModalItem";
import SelectedModalItem from "./SelectedModalItem";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { SearchedUser, UserSearchResponse } from "@/types/Responses";
import {
  SHARE_MODAL_ERROR_TO_LOAD_SEARCH_RESULT,
  SHARE_MODAL_LOADING_SEARCH_RESULT,
  SHARE_MODAL_NO_SEARCH_RESULT,
} from "@/utils/strings";
const ShareModal = () => {
  const $searchInput = useRef<HTMLInputElement>(null);
  const $timeoutKey = useRef<NodeJS.Timeout | undefined>();
  const [itemName, setItemName] = useState<string>("2019년 아동부 결산");
  const [userSearchquery, setUserSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<SearchedUser[]>([]);
  const searchQuery = useQuery({
    queryKey: ["share", "user", "search", { query: userSearchquery }],
    queryFn: () =>
      axios
        .get(`/api/user/search?query=${userSearchquery}`)
        .then((res: AxiosResponse<UserSearchResponse>) => res.data),
    enabled: userSearchquery !== "" ? true : false,
  });
  // useEffect(() => {
  //   if (timeoutKey) {
  //     clearTimeout(timeoutKey);
  //     setTimeoutKey(() => undefined);
  //   }
  //   const newTimeoutKey = setTimeout(() => {
  //     searchQuery.refetch();
  //   }, 1000);

  //   setTimeoutKey(() => newTimeoutKey);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userSearchquery]);

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    if ($timeoutKey.current) {
      clearTimeout($timeoutKey.current);
      $timeoutKey.current = undefined;
    }
    const newTimeoutKey = setTimeout(() => {
      setUserSearchQuery(() => e.target.value);
    }, 1000);

    $timeoutKey.current = newTimeoutKey;
  };
  const handleClickToClearSearchQuery = () => {
    if ($searchInput.current === null) {
      return;
    }
    $searchInput.current.value = "";
    setUserSearchQuery(() => "");
  };
  const handleClickToAddSelection = (
    e: React.MouseEvent<HTMLDivElement>,
    user: SearchedUser
  ) => {
    setSelectedItems((prev) => [...prev, user]);
  };
  const handleClickToCancelSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setSelectedItems((prev) => prev.toSpliced(index, 1));
  };
  const modalItems = useMemo(() => {
    if (searchQuery.isLoading) {
      return <div>{SHARE_MODAL_LOADING_SEARCH_RESULT}</div>;
    }
    if (searchQuery.isError) {
      return <div>{SHARE_MODAL_ERROR_TO_LOAD_SEARCH_RESULT}</div>;
    }
    const searchedusers = searchQuery.data?.searchedUsers ?? [];
    if (searchedusers.length === 0) {
      return <div>{SHARE_MODAL_NO_SEARCH_RESULT}</div>;
    }
    return searchedusers.map((user, index) => (
      <div key={`item-${index}-${user.userId}`}>
        <label
          htmlFor={`item-${user.username}`}
          className="relative group">
          <ModalItem
            iconURL={user.iconURL}
            topText={user.username}
            bottomText={user.email}
          />
          <input
            id={`item-${user.username}`}
            className="hidden"
            type="checkbox"
            onClick={(e) => handleClickToAddSelection(e, user)}
          />
        </label>
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery.data]);

  const selectedModalItems = useMemo(() => {
    if (!selectedItems || selectedItems.length === 0) {
      return <></>;
    }
    return selectedItems.map((item, index) => (
      <div
        key={`selected-${index}`}
        className="relative">
        <SelectedModalItem
          iconURL={item.iconURL}
          text={item.email}
        />
        <button
          className="absolute top-1 right-2"
          type={"button"}
          onClick={(e) => handleClickToCancelSelection(e, index)}>
          <div className="cursor-pointer ml-auto py-1 min-w-[24px] min-h-[24px]">
            <Image
              className="hover:bg-slate-600 rounded-full p-1 min-w-[24px] min-h-[24px]"
              src={CancelIcon}
              alt={""}
              width={24}
              height={24}
            />
          </div>
        </button>
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);
  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen opacity-60 bg-slate-900 z-10"></div>
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
                    <article className="w-full mb-2 h-10 relative">
                      <input
                        ref={$searchInput}
                        className="w-full p-2 rounded-lg text-stone-950 h-full"
                        type="text"
                        placeholder="공유할 사용자의 이메일 또는 전화번호를 입력하세요."
                        onChange={handleChangeQuery}
                      />
                      <button
                        className="absolute top-1 right-2"
                        onClick={handleClickToClearSearchQuery}>
                        <div className="cursor-pointer ml-auto py-1 min-w-[24px] min-h-[24px]">
                          <Image
                            className="hover:bg-slate-200 rounded-full p-1 min-w-[24px] min-h-[24px]"
                            src={DarkCancelIcon}
                            alt={""}
                            width={24}
                            height={24}
                          />
                        </div>
                      </button>
                    </article>
                  </section>

                  <section
                    role="selected-modal-items"
                    className="flex gap-2 mb-2 overflow-x-scroll snap-x">
                    {selectedModalItems}
                  </section>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(e.currentTarget);
                    }}>
                    <fieldset className="mb-auto">
                      <legend className="text-xl my-2">검색 결과</legend>

                      <div
                        role="modal-items"
                        className="col-span-1 mb-3 overflow-y-scroll h-32 select-none">
                        {modalItems}
                      </div>
                    </fieldset>

                    <fieldset className="float-right h-10">
                      <div className="flex gap-4">
                        <button
                          className="leading-10"
                          type="reset">
                          취소
                        </button>
                        <button
                          className="bg-blue-600 py-2 px-5 rounded-xl"
                          type="submit">
                          공유
                        </button>
                      </div>
                    </fieldset>
                  </form>
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
