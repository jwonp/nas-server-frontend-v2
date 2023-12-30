import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
const Provider = ({ children }: { children: JSX.Element }) => {
  return <ReduxProvider store={store}> {children} </ReduxProvider>;
};
export default Provider;
