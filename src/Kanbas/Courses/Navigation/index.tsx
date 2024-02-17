import { Link, useLocation } from "react-router-dom";
import "./index.css";

interface CourseNavigationLink {
  title: string;
  link: string;
}

function CourseNavigation() {
  const links: CourseNavigationLink[] = [
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

  const { pathname } = useLocation();

  return (
    <div id="wdSectionNavigation" className="collapse collapse-horizontal show">
      <ul className="wd-course-navigation">
        {links.map((courseNavigationLink, index) => (
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
    </div>
  );
}
export default CourseNavigation;
