export type Question = Record<"id" | "value", string>;
const QUESTIONS: Question[] = [
  { id: "1", value: "Can you code in Ruby?" },
  { id: "2", value: "Can you code in JavaScript?" },
  { id: "3", value: "Can you code in Swift?" },
  { id: "4", value: "Can you code in Java?" },
  { id: "5", value: "Can you code in C#?" },
];

export default QUESTIONS;
