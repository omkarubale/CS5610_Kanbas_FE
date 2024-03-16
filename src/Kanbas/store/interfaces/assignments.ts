export interface IKanbasAssignmentSection {
  _id: string;
  course: string;
  title: string;
  weightage: string;
}

export interface IKanbasAssignment {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableToDate: string;
  sectionId: string;
}
