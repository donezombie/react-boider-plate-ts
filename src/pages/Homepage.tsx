import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthenticationProvider";

const Homepage = () => {
  const { logout } = useAuth();
  return (
    <div>
      <p>Homepage</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Homepage;
