import { ParsedUrlQuery } from "querystring";
import NavigatorSelectbutton, {
  NavigatorSelectbuttonProps,
} from "@/components/admin/Navigator/assets/NavigatorSelectbutton";
import { useEffect, useMemo } from "react";

type AdminPageNavigatorProps = {
  path: string[];
};
const navigatorItems: {
  [key: string]: Omit<NavigatorSelectbuttonProps, "path">[];
} = {
  users: [
    { title: "임시 계정 관리", linkTo: ["users", "temporary"], depth: 2 },
    { title: "사용자 관리", linkTo: ["users", "user"], depth: 2 },

  ],
  storages: [
    { title: "S3 사용량", linkTo: ["storages", "usage"], depth: 2 },
    { title: "S3 요금", linkTo: ["storages", "bill"], depth: 2 },
  ],
  shares: [
    { title: "공유 팀 관리", linkTo: ["shares", "team"], depth: 2 },
    { title: "공유 권한 관리", linkTo: ["shares", "authentication"], depth: 2 },
  ],
  subscribes: [
    { title: "구독 티어 설정", linkTo: ["subscribes", "tier"], depth: 2 },
    { title: "구독 통계", linkTo: ["subscribes", "analysis"], depth: 2 },
  ],
};

const AdminPageNavigator = ({ path }: AdminPageNavigatorProps) => {
  const subItems = useMemo(() => {
    if (path && path[0]) {
      const rootItem = path[0];
      const subitemOptions = navigatorItems[rootItem];
      return subitemOptions.map((item) => (
        <NavigatorSelectbutton
          key={`nav-item-${item.linkTo.join("/")}`}
          {...item}
          path={path}
        />
      ));
    }
    return <div></div>;
  }, [path]);
  return (
    <nav className="">
      <section className="flex px-5">
        <NavigatorSelectbutton
          title={"계정"}
          linkTo={["users"]}
          depth={1}
          path={path}
        />
        <NavigatorSelectbutton
          title={"스토리지"}
          linkTo={["storages"]}
          path={path}
          depth={1}
        />
        <NavigatorSelectbutton
          title={"공유"}
          linkTo={["shares"]}
          path={path}
          depth={1}
        />
        <NavigatorSelectbutton
          title={"구독"}
          linkTo={["subscribes"]}
          path={path}
          depth={1}
        />
      </section>
      <section className="flex py-2 px-5 border-t-2 border-b-2 ">
        {subItems}
      </section>
    </nav>
  );
};

export default AdminPageNavigator;
