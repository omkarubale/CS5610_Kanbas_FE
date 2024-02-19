import { ReactNode } from "react";
import "./index.css";

function MiddleContent({ children }: { children: ReactNode }) {
  return <div className="wd-middle-content flex-fill">{children}</div>;
}

export default MiddleContent;
