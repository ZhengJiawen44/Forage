import Menu from "./Menu";
import Link from "next/link";
const MenuContainer = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) {
    return (
      <Link
        href="/auth/login"
        className="flex gap-2 items-center mt-1 text-item-foreground hover:text-white"
      >
        <p>Login</p>
      </Link>
    );
  }
  const user = await res.json();

  return <Menu userName={user.name} userEmail={user.email} />;
};

export default MenuContainer;
