export interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  tags: Tag[];
  score: number;
  ratingCount: number;
  franchiseId?: string;
  coverImage?: string;
  test?: Test | undefined;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  characterOrder: number;
}

export interface Tag {
  tagId: string;
  tagName: string;
}

export interface TestResult {
  testId: string;
  selectedOptions: string[];
  date: Date;
  resultDescription: string;
  name: string;
}

export interface TestProgress {
  testId: string;
  currentQuestionIndex: number;
  selectedOptions: string[];
}
