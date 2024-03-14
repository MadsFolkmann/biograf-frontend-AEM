import { useOutlet } from "react-router-dom";
import { Outlet } from "../../node_modules/react-router-dom/dist/index";
import BiografList from "../List/BiografList";
import "./BiografLayout.css";

export default function BiografLayout() {
  const outlet = useOutlet();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <BiografList />
      </div>
      <div className="outlet-container">
        {outlet || <h3>Se en biograf du vil se information på</h3>}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}
