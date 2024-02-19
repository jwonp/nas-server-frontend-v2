import Image from "next/image"
import UserIcon from "@public/icons/userCircle.png"
type SearchedUserItemProps = {
    imageUrl:string
}
const SearchedUserItem = ({imageUrl}:SearchedUserItemProps) =>{
    return <div className="rounded-lg">
        <figure><Image src={imageUrl ?? UserIcon} alt={""}/></figure>
        <p></p>
        <p></p>
    </div>
}