import { ReactNode } from "react";
import "./index.css";

function RightSide({ children }: { children: ReactNode }) {
  return <div className="wd-right-side d-none d-lg-block">{children}</div>;
}

export default RightSide;
