import { Link, useLocation } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import "./index.css";
import {
  FaCircleNodes,
  FaFilePen,
  FaGear,
  FaHouse,
  FaUserGroup,
} from "react-icons/fa6";
import {
  FaBullhorn,
  FaClipboardCheck,
  FaComments,
  FaFile,
  FaFolder,
  FaPeopleArrows,
  FaPlug,
  FaRocket,
} from "react-icons/fa";

export interface CourseNavigationLink {
  title: string;
  link: string;
  icon: any;
}

export const courseNavigationLinks: CourseNavigationLink[] = [
  { title: "Home", link: "Home", icon: <FaHouse /> },
  { title: "Modules", link: "Modules", icon: <FaCircleNodes /> },
  { title: "Piazza", link: "Piazza", icon: <FaPlug /> },
  { title: "Zoom Meetings", link: "ZoomMeetings", icon: <FaPlug /> },
  { title: "Assignments", link: "Assignments", icon: <FaFilePen /> },
  { title: "Quizzes", link: "Quizzes", icon: <FaRocket /> },
  { title: "Grades", link: "Grades", icon: <FaClipboardCheck /> },
  { title: "People", link: "People", icon: <FaUserGroup /> },
  { title: "Panopto Video", link: "PanoptoVideo", icon: <FaPlug /> },
  { title: "Discussions", link: "Discussions", icon: <FaComments /> },
  { title: "Announcements", link: "Announcements", icon: <FaBullhorn /> },
  { title: "Pages", link: "Pages", icon: <FaFile /> },
  { title: "Files", link: "Files", icon: <FaFolder /> },
  { title: "Rubrics", link: "Rubrics", icon: <FaPlug /> },
  { title: "Outcomes", link: "Outcomes", icon: <FaPlug /> },
  { title: "Collaborations", link: "Collaborations", icon: <FaPeopleArrows /> },
  { title: "Syllabus", link: "Syllabus", icon: <FaPlug /> },
  { title: "Settings", link: "Settings", icon: <FaGear /> },
];

function CourseNavigation(props: { subNavigationOpen: boolean }) {
  const { pathname } = useLocation();

  return (
    <div className="wd-course-navigation-container d-none d-md-block pe-0">
      <Collapse in={props.subNavigationOpen} dimension="width">
        <ul className="wd-course-navigation">
          {courseNavigationLinks.map((courseNavigationLink, index) => (
            <li
              key={index}
              className={
                pathname.includes(courseNavigationLink.link)
                  ? "wd-submenu-active"
                  : ""
              }
            >
              <Link to={courseNavigationLink.link}>
                {courseNavigationLink.title}
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

export default CourseNavigation;
