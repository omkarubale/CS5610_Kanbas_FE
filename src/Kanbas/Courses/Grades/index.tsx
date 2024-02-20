import {
  FaCaretDown,
  FaFileExport,
  FaFileImport,
  FaFilter,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaGear } from "react-icons/fa6";
import { assignments, enrollments, grades, users } from "../../Database";
import "./index.css";

function Grades() {
  const { courseId } = useParams();
  const courseAssignments = assignments.filter((a) => a.course == courseId);
  const courseEnrollments = enrollments.filter((e) => e.course == courseId);

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <Button className="btn wd-button-standard">
            <FaFileImport /> Import
          </Button>
          <Button className="btn wd-button-standard">
            <FaFileExport /> Export
            <FaCaretDown />
          </Button>
          <Button className="btn wd-button-standard">
            <FaGear className="m-1" />
          </Button>
        </MiddleContentActions>

        <MiddleContentData>
          <Form className="mb-3">
            <div className="mb-3 row">
              <Form.Group className="col-6" controlId="formGradesStudentNames">
                <Form.Label className="fw-bold">Student Names</Form.Label>
                <Form.Control type="text" placeholder="Search Students" />
              </Form.Group>
              <Form.Group
                className="col-6"
                controlId="formGradesAssignmentNames"
              >
                <Form.Label className="fw-bold">Assignment Names</Form.Label>
                <Form.Control type="text" placeholder="Search Assignments" />
              </Form.Group>
            </div>
            <p />
            <Button className="wd-button-standard">
              <FaFilter /> Apply Filters
            </Button>
          </Form>

          <Table responsive="md" bordered className="wd-grades-table" size="sm">
            <thead className="table-secondary">
              <tr>
                <th scope="col" className="text-start fw-bold">
                  Student Name
                </th>
                {courseAssignments.map((assignment) => (
                  <th scope="col">
                    <div>{assignment.title}</div>
                    <div>Out of 100</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courseEnrollments.map((enrollment, index) => (
                <tr
                  className={index % 2 == 0 ? "table-light" : "table-secondary"}
                >
                  <th scope="row">
                    <a
                      href="#"
                      className="wd-grades-grid-student text-truncate"
                    >
                      {users
                        .filter((user) => user._id == enrollment.user)
                        .map((u) => u.firstName + " " + u.lastName)}
                    </a>
                  </th>
                  {courseAssignments.map((assignment) => (
                    <td>
                      {grades
                        .filter(
                          (grade) =>
                            grade.assignment == assignment._id &&
                            grade.student == enrollment.user
                        )
                        ?.map((g) => g.grade)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}

export default Grades;
