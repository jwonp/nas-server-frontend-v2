import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import CancelIcon from "@public/icons/close-white.svg";
import DarkCancelIcon from "@public/icons/close.svg";
import ModalItem from "./ModalItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { SearchedUser, UserSearchResponse } from "@/types/Responses";
import {
  SHARE_MODAL_ERROR_TO_LOAD_SEARCH_RESULT,
  SHARE_MODAL_LOADING_SEARCH_RESULT,
  SHARE_MODAL_NO_SEARCH_RESULT,
} from "@/utils/strings";
import SelectedModalItem from "./SelectedModalItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getShareModalSwitch,
  turnOffShareModal,
} from "@/redux/featrues/modalSwitchSlice";
import {
  addObjectElementOnArray,
  deleteObjectElementOnArray,
} from "@/utils/array";
import Modal from "./common/Modal";
type ShareModalProps = {};
const ShareModal = ({}: ShareModalProps) => {
  const dispatch = useAppDispatch();
  const shareModalSwitch = useAppSelector(getShareModalSwitch);
  const $searchInput = useRef<HTMLInputElement>(null);
  const $timeoutKey = useRef<NodeJS.Timeout | undefined>();
  const [userSearchquery, setUserSearchQuery] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<SearchedUser[]>([]);
  const searchQuery = useQuery({
    queryKey: ["share", "user", "search", { query: userSearchquery }],
    queryFn: () =>
      axios
        .get(`/api/user/search?query=${userSearchquery}`)
        .then((res: AxiosResponse<UserSearchResponse>) => res.data),
    enabled: userSearchquery !== "" ? true : false,
  });
  const addShare = useMutation({
    mutationFn: (selectedUsers: SearchedUser[]) =>
      axios.post("/api/user/share", { selectedUsers }).then((res) => res.data),
  });
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
  const handleClickToCancelSelection = (user: SearchedUser) => {
    const targetCheckbox = document.getElementById(
      `item-${user.email}`
    ) as HTMLInputElement;
    if (targetCheckbox) {
      return targetCheckbox.click();
    }
    setSelectedUsers((prev) =>
      deleteObjectElementOnArray(prev, { element: user })
    );
  };
  const handleClickToResetSelection = () => {
    setSelectedUsers(() => []);
    dispatch(turnOffShareModal());
  };
  useEffect(() => {
    console.log(selectedUsers.map((item) => item.email));
  }, [selectedUsers]);
  const modalItems = useMemo(() => {
    if (userSearchquery === "") {
      return <div></div>;
    }
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
          htmlFor={`item-${user.email}`}
          className="relative group">
          <ModalItem
            iconURL={user.iconURL}
            topText={user.username}
            bottomText={user.email}
          />
          <input
            id={`item-${user.email}`}
            className="hidden"
            type="checkbox"
            onChange={(e) => {
              setSelectedUsers((prev) =>
                e.target.checked
                  ? addObjectElementOnArray(prev, user)
                  : deleteObjectElementOnArray(prev, {
                      element: user,
                    })
              );
            }}
          />
        </label>
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery.data]);
  const selectedModalItems = useMemo(() => {
    if (selectedUsers.length === 0) {
      return <></>;
    }
    return selectedUsers.map((user, index) => (
      <div
        key={`selected-${index}`}
        className="relative snap-center">
        <SelectedModalItem
          iconURL={user.iconURL}
          text={user.email}
        />
        <button
          className="absolute top-2 right-2 hover:bg-slate-500 rounded-full overflow-hidden "
          onClick={() => handleClickToCancelSelection(user)}>
          <figure className="min-x-[24px] min-y-[24px] ">
            <Image
              className="min-x-[24px] min-y-[24px] p-1"
              src={CancelIcon}
              alt={""}
              width={24}
              height={24}
            />
          </figure>
        </button>
      </div>
    ));
  }, [selectedUsers]);
  if (!shareModalSwitch.isVisible) {
    return <></>;
  }
  return (
    <Modal>
      <section className="w-full h-full bg-slate-500 rounded-lg max-lg:rounded-none p-5">
        <section className="h-20">
          <p className="text-xl mb-2">{`"${shareModalSwitch.title}" 공유`}</p>
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
        <section className="flex gap-2 snap-x  overflow-x-scroll">
          {selectedModalItems}
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <fieldset className="mb-auto">
            <legend className="text-xl my-2">검색 결과</legend>
            <div
              role="modal-items"
              className="col-span-1 mb-3 overflow-y-scroll h-auto select-none">
              {modalItems}
            </div>
          </fieldset>

          <fieldset className="float-right h-10">
            <div className="flex gap-4">
              <button
                className="leading-10"
                type="reset"
                onClick={handleClickToResetSelection}>
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
    </Modal>
  );
};

export default ShareModal;
