import { Dispatch, UnknownAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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

const COURSES_API = "http://localhost:4000/api/courses";
export const fetchAllCourses = async (dispatch: Dispatch<UnknownAction>) => {
  const response = await axios.get(COURSES_API);
  dispatch(setCourses(response.data));
};

export const addNewCourse = async (
  dispatch: Dispatch<UnknownAction>,
  course: IKanbasCourse
) => {
  const response = await axios.post(COURSES_API, course);
  dispatch(addCourse(response.data));
};

export const deleteCourse = async (
  dispatch: Dispatch<UnknownAction>,
  courseId: string
) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  dispatch(removeCourse(courseId));
};

export const putCourse = async (
  dispatch: Dispatch<UnknownAction>,
  course: IKanbasCourse
) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  dispatch(updateCourse());
};

export const getCourse = async (
  dispatch: Dispatch<UnknownAction>,
  courseId: string
) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  dispatch(setCourse(response.data));
};
