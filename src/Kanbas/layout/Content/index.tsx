import { ReactNode } from "react";
import "./index.css";

function Content({ children }: { children: ReactNode }) {
  return <div className="wd-content">{children}</div>;
}

export default Content;
