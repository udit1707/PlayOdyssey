"use client";
import { useRouter } from "next/navigation";
import "./Header.css";

interface HeaderProps {
  title: string;
  className?: string;
  showHomeBtn?: boolean;
}
const Header: React.FC<HeaderProps> = ({ title, className, showHomeBtn }) => {
  const router = useRouter();
  return (
    <div className="header-cnt">
      {showHomeBtn && (
        <div
          className="home-btn"
          onClick={() => {
            router.push("/");
          }}
        >
          Back to playlist
        </div>
      )}
      <div className="header-title">{title}</div>
    </div>
  );
};

export default Header;
