import { Link, useLocation } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import "./index.css";

export interface CourseNavigationLink {
  title: string;
  link: string;
}

export const courseNavigationLinks: CourseNavigationLink[] = [
  { title: "Home", link: "Home" },
  { title: "Modules", link: "Modules" },
  { title: "Piazza", link: "Piazza" },
  { title: "Zoom Meetings", link: "ZoomMeetings" },
  { title: "Assignments", link: "Assignments" },
  { title: "Quizzes", link: "Quizzes" },
  { title: "Grades", link: "Grades" },
  { title: "People", link: "People" },
  { title: "Panopto Video", link: "PanoptoVideo" },
  { title: "Discussions", link: "Discussions" },
  { title: "Announcements", link: "Announcements" },
  { title: "Pages", link: "Pages" },
  { title: "Files", link: "Files" },
  { title: "Rubrics", link: "Rubrics" },
  { title: "Outcomes", link: "Outcomes" },
  { title: "Collaborations", link: "Collaborations" },
  { title: "Syllabus", link: "Syllabus" },
  { title: "Settings", link: "Settings" },
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
