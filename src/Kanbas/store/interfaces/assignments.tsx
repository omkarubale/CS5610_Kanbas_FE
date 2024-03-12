export interface IKanbasAssignment {
  _id: string;
  title: string;
  sectionId: string;
  course: string;
}

export interface IKanbasAssignmentSection {
  _id: string;
  course: string;
  title: string;
  weightage: string;
}
