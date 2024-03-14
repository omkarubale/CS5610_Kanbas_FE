import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { IKanbasModule } from "../../store/interfaces/modules";

const initialState: { modules: IKanbasModule[]; module: IKanbasModule } = {
  modules: modules,
  module: {
    _id: "",
    course: "",
    name: "New Module 123",
    description: "New Description",
  },
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
  },
});

export const { addModule, deleteModule, updateModule, setModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
