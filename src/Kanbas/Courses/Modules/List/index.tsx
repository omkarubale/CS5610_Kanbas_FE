import React, { useState } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./../reducer";
import { KanbasState } from "../../../store";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";

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

  return (
    <>
      <ul className="list-group wd-modules">
        <li className="list-group-item d-flex">
          <div className="d-inline-flex w-100">
            <input
              className=""
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
            <textarea
              className="ms-1 w-100"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
          <Button
            className="wd-button-standard my-1 ms-0 px-2"
            onClick={() => dispatch(addModule({ course: courseId }))}
          >
            Add
          </Button>
          <Button
            className="wd-button-standard my-1 me-1 px-2"
            onClick={() => dispatch(updateModule(module))}
          >
            Update
          </Button>
        </li>
        {modulesList.map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module._id)}
          >
            <div className="wd-modules-section d-flex align-items-center">
              <FaGripVertical className="me-2" />
              <div className="me-auto d-flex justify-content-center align-items-center">
                {module.name}{" "}
                <Button
                  className="d-contents"
                  onClick={() => dispatch(setModule(module))}
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
