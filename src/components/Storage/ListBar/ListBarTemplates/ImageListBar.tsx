import ListBar, { ListBarType } from "../ListBar";


const ImageListBar = (props: Omit<ListBarType, "fileIcon">) =>{
    return (
        <ListBar
          fileIcon={"image"}
          {...props}
        />
      );

}

export default ImageListBar;