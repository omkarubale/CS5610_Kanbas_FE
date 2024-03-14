import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./../Courses/Modules/reducer";
import coursesReducer from "./../Courses/reducer";
import { IKanbasModule } from "./interfaces/modules";
import { IKanbasCourse } from "./interfaces/courses";
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
}
const store = configureStore({
  reducer: {
    modulesReducer,
    coursesReducer,
  },
});

export default store;
