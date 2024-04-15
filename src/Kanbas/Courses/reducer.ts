import { createSlice } from "@reduxjs/toolkit";
import { IKanbasCourse } from "../store/interfaces/courses";

const initialState: {
  coursesAvailable: boolean;
  courses: IKanbasCourse[];
  course: IKanbasCourse;
} = {
  coursesAvailable: false,
  courses: [] as IKanbasCourse[],
  course: {
    _id: "",
    name: "",
    number: "",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      if (!state.coursesAvailable) {
        state.courses = action.payload;
        state.coursesAvailable = true;
      }
    },
    addCourse: (state, action) => {
      const course = action.payload;
      state.courses = [...state.courses, course];
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    updateCourse: (state) => {
      state.courses = state.courses.map((course) => {
        if (course._id === state.course._id) {
          return state.course;
        } else {
          return course;
        }
      });
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});

export const { setCourses, addCourse, removeCourse, updateCourse, setCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
