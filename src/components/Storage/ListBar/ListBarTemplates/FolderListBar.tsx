import ListBar, { ListBarType } from "../ListBar";


const FolderListBar = (props: Omit<ListBarType,"fileIcon">) =>{
    return (
        <ListBar
          fileIcon={"folder"}
          {...props}
        />
      );

}

export default FolderListBar;