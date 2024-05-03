import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthenticationProvider";
import TodosInfiniteScroll from "./TodosInfiniteScroll";
import Todos from "./Todos";

const Homepage = () => {
  //! State
  const { logout } = useAuth();

  //! Function

  //! Render

  return (
    <div className="component:Homepager p-2">
      <div className="mb-2 flex items-center gap-3">
        <p>Homepage</p>
        <Button onClick={logout}>Logout</Button>
      </div>

      <Todos />

      <TodosInfiniteScroll />
    </div>
  );
};

export default Homepage;
