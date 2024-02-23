import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaHistory,
  FaTv,
  FaRegQuestionCircle,
  FaLongArrowAltLeft,
  FaInbox,
} from "react-icons/fa";
import { FaC } from "react-icons/fa6";
import KanbasNavigationMobile from "../mobile/Navigation";

export interface KanbasNavigationLink {
  label: string;
  icon: any;
  mobile_icon: any;
}

export const kanbasNavigationLinks: KanbasNavigationLink[] = [
  {
    label: "Account",
    icon: <FaRegUserCircle className="wd-icon-white" />,
    mobile_icon: <FaRegUserCircle />,
  },
  {
    label: "Dashboard",
    icon: <FaTachometerAlt className="" />,
    mobile_icon: <FaTachometerAlt className="" />,
  },
  {
    label: "Courses",
    icon: <FaBook className="" />,
    mobile_icon: <FaBook className="" />,
  },
  {
    label: "Calendar",
    icon: <FaRegCalendarAlt className="" />,
    mobile_icon: <FaRegCalendarAlt className="" />,
  },
  {
    label: "Inbox",
    icon: <FaInbox className="" />,
    mobile_icon: <FaInbox className="" />,
  },
  {
    label: "History",
    icon: <FaHistory className="" />,
    mobile_icon: <FaHistory className="" />,
  },
  {
    label: "Studio",
    icon: <FaTv className="" />,
    mobile_icon: <FaTv className="" />,
  },
  {
    label: "Commons",
    icon: <FaC className="" />,
    mobile_icon: <FaC className="" />,
  },
  {
    label: "Help",
    icon: <FaRegQuestionCircle className="" />,
    mobile_icon: <FaRegQuestionCircle className="" />,
  },
];

function KanbasNavigation() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="wd-kanbas-navigation-container d-none d-md-block">
        <ul className="wd-kanbas-navigation">
          <li>
            <a href="http://northeastern.edu">
              <img
                src="/assets/NEU_logo.webp"
                alt="N"
                height="80px"
                width="80px"
              />
            </a>
          </li>
          {kanbasNavigationLinks.map((link, index) => (
            <li
              key={index}
              className={
                (link.label === "Account" ? "wd-nav-account" : "") +
                " " +
                (pathname.includes(link.label) ? "wd-active" : "")
              }
            >
              <div className="wd-kanbas-nav-item">
                <Link to={`/Kanbas/${link.label}`}>
                  {" "}
                  <div>{link.icon}</div> {link.label}{" "}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <ul className="wd-kanbas-navigation-bottom">
          <li>
            <div className="wd-kanbas-navigation-bottom-item">
              <Link to="#">
                <div>
                  <FaLongArrowAltLeft />
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <KanbasNavigationMobile />
    </>
  );
}
export default KanbasNavigation;
