import ShopWithMeLogo from "@/assets/logo.svg";

const Logo = ({ className }: { className?: string }) => {
  return <img src={ShopWithMeLogo} alt="logo" className={className} />;
};

export default Logo;
