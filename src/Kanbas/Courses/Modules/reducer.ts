import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { IKanbasModule } from "../../store/interfaces/modules";

const initialState: {
  modules: IKanbasModule[];
  module: IKanbasModule;
  addModuleDrawerOpen: boolean;
} = {
  modules: modules,
  module: {
    _id: "",
    course: "",
    name: "New Module",
    description: "New Module Description",
  },
  addModuleDrawerOpen: false,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      const courseId = action.payload.course;
      state.module = {
        ...state.module,
        course: courseId,
        _id: new Date().getTime().toString(),
      };

      state.modules = [...state.modules, state.module];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    resetModuleForm: (state) => {
      state.module._id = "";
      state.module.course = "";
      state.module.name = "New Module";
      state.module.description = "New Module Description";
    },
    setAddModuleDrawerOpen: (state, action) => {
      state.addModuleDrawerOpen = action.payload;
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setAddModuleDrawerOpen,
  resetModuleForm,
} = modulesSlice.actions;
export default modulesSlice.reducer;