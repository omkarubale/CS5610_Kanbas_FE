export interface IKanbasModuleLesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface IKanbasModule {
  _id: string;
  name: string;
  description: string;
  courseId: string;
  lessons?: IKanbasModuleLesson[];
}
