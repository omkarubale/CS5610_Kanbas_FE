import React, { useState } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setAddModuleDrawerOpen,
} from "./../reducer";
import { KanbasState } from "../../../store";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
  FaPen,
  FaTrash,
  FaCaretDown,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Button, Card, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules.filter((m) => m.course == courseId)
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  const [selectedModuleId, setSelectedModule] = useState(modulesList[0]._id);
  const addModuleDrawerOpen = useSelector(
    (state: KanbasState) => state.modulesReducer.addModuleDrawerOpen
  );

  return (
    <>
      <h5>
        Add Module
        <FaCaretDown
          onClick={() => dispatch(setAddModuleDrawerOpen(!addModuleDrawerOpen))}
          aria-controls="add-module-drawer-controls"
          aria-expanded={addModuleDrawerOpen}
          style={{ transform: addModuleDrawerOpen ? "" : "rotate(-90deg)" }}
        />
      </h5>
      <Collapse in={addModuleDrawerOpen}>
        <div>
          <Card className="p-3 mb-3 rounded-0">
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, name: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  className="mb-3"
                  value={module.description}
                  onChange={(e) =>
                    dispatch(
                      setModule({ ...module, description: e.target.value })
                    )
                  }
                />
              </Form.Group>
              <Form.Group className="d-flex">
                <Button
                  className="wd-button-standard my-1 ms-auto px-2"
                  onClick={() => dispatch(addModule({ course: courseId }))}
                >
                  Add
                </Button>
                <Button
                  className="wd-button-standard my-1 me-0 px-2"
                  onClick={() => dispatch(updateModule(module))}
                >
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </div>
      </Collapse>
      <ul className="list-group wd-modules">
        {modulesList.map((module, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => setSelectedModule(module._id)}
          >
            <div className="wd-modules-section d-flex align-items-center">
              <FaGripVertical className="me-2" />
              <div className="me-auto d-flex justify-content-center align-items-center">
                {module.name}{" "}
                <Button
                  className="d-contents"
                  onClick={() => {
                    dispatch(setModule(module));
                    dispatch(setAddModuleDrawerOpen(true));
                  }}
                >
                  <FaPen className="ms-2" />
                </Button>
                <Button
                  className="d-contents"
                  onClick={() => dispatch(deleteModule(module._id))}
                >
                  <FaTrash className="ms-2" />
                </Button>
              </div>
              <span className="float-end wd-modules-content-actions d-flex">
                <FaCheckCircle className="wd-icon-green" />
                <FaPlus className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            {selectedModuleId === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item d-flex align-items-center">
                    <FaGripVertical className="me-2" />
                    <div className="wd-modules-content-text me-auto">
                      {lesson.name}
                    </div>
                    <span className="float-end wd-modules-content-actions d-flex">
                      <FaCheckCircle className="wd-icon-green" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;
