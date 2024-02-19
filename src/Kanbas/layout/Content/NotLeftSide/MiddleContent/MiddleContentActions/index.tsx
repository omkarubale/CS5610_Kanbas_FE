import { ReactNode } from "react";
import "./index.css";

function MiddleContentActions({ children }: { children: ReactNode }) {
  return <div className="wd-middle-content-actions">{children}</div>;
}

export default MiddleContentActions;
