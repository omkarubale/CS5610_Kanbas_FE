import { ReactNode } from "react";
import "./index.css";

function NotLeftSide({ children }: { children: ReactNode }) {
  return <div className="wd-not-left-side flex-fill">{children}</div>;
}

export default NotLeftSide;
