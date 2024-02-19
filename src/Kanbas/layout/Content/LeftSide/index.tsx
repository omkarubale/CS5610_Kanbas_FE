import { ReactNode } from "react";
import "./index.css";

function LeftSide({ children }: { children: ReactNode }) {
  return <div className="wd-left-side">{children}</div>;
}

export default LeftSide;
