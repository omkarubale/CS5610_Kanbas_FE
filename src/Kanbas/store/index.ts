import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import coursesReducer from "../Courses/reducer";
import { IKanbasModule } from "./interfaces/modules";
import { IKanbasCourse } from "./interfaces/courses";
import {
  IKanbasAssignment,
  IKanbasAssignmentSection,
} from "./interfaces/assignments";
export interface KanbasState {
  modulesReducer: {
    modules: IKanbasModule[];
    module: IKanbasModule;
    addModuleDrawerOpen: boolean;
  };
  coursesReducer: {
    courses: IKanbasCourse[];
    course: IKanbasCourse;
  };
  assignmentsReducer: {
    assignmentsAvailable: boolean;
    assignments: IKanbasAssignment[];
    assignment: IKanbasAssignment;
    assignmentSections: IKanbasAssignmentSection[];
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    coursesReducer,
    assignmentsReducer,
  },
});

export default store;
