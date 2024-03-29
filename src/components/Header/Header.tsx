import "./Header.css";

interface HeaderProps {
    title:string,
    className?:string
}
const Header:React.FC<HeaderProps> = ({title,className}) => {
    return ( <div className="header-cnt">
        {title}
    </div> );
}
 
export default Header;