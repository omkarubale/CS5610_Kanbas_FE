import { ReactNode } from "react";
import "./index.css";

function MiddleContentData({ children }: { children: ReactNode }) {
  return <div className="wd-middle-content-data">{children}</div>;
}

export default MiddleContentData;
