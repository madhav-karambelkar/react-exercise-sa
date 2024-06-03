import React from "react";
import { type Question as QuestionType } from "../../questions";

export type QuestionProps = {
  questionData: QuestionType;
  isYesAnswerChecked: boolean;
  isNoAnswerChecked: boolean;
  onChangeYes?: () => void;
  onChangeNo?: () => void;
};

export default function Question({
  isNoAnswerChecked,
  isYesAnswerChecked,
  questionData: { id, value: questionName },
  onChangeNo,
  onChangeYes,
}: QuestionProps) {
  return (
    <div>
      <span>{questionName} : </span>
      <label htmlFor={`${questionName}-yes`}>Yes:</label>
      <input
        type="radio"
        id={`${questionName}-yes`}
        data-testid={`${questionName}-yes`}
        name={id}
        onChange={onChangeYes}
        checked={isYesAnswerChecked}
      />

      <label htmlFor={`${questionName}-no`}>No:</label>
      <input
        type="radio"
        id={`${questionName}-no`}
        data-testid={`${questionName}-no`}
        name={id}
        onChange={onChangeNo}
        checked={isNoAnswerChecked}
      />
    </div>
  );
}
