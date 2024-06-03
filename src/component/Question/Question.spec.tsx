import React from "react";
import QUESTIONS from "../../questions";
import { render, screen, waitFor } from "../../testing/testConfig";
import Question, { QuestionProps } from "./Question";
import { act } from 'react-dom/test-utils';

// MOCKING ONCHANGE FUNCTION
const mockOnChangeNo = jest.fn();
const mockOnChangeYes = jest.fn();

const questionProps: QuestionProps = {
  questionData: QUESTIONS[0],
  isYesAnswerChecked: false,
  isNoAnswerChecked: false,
  onChangeNo: mockOnChangeNo,
  onChangeYes: mockOnChangeYes,
};

type OptionName = "Yes:" | "No:";

type RecordData = {
  questionKeyName: keyof QuestionProps;
  optionName: OptionName;
};

type ArrayOfKeys = Array<RecordData>;
const keysData: ArrayOfKeys = [
  { questionKeyName: "isNoAnswerChecked", optionName: "No:" },
  { questionKeyName: "isYesAnswerChecked", optionName: "Yes:" },
];

describe("<Question />", () => {
  it("should render Question Component", () => {
    render(<Question {...questionProps} />);
  });

  it("should default only yes/no radio option", () => {
    render(<Question {...questionProps} />);

    expect(screen.getByRole("radio", { name: "Yes:" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "No:" })).toBeInTheDocument();
  });

  it.each(keysData)(
    'should be checked "true" when "$questionKeyName" is true',
    (keyofQuestionData) => {
      const { questionKeyName, optionName } = keyofQuestionData;
      render(<Question {...{ ...questionProps, [questionKeyName]: true }} />);
      expect(screen.getByRole("radio", { name: optionName })).toBeChecked();
    }
  );

  it.each(keysData)(
    'should be checked "false" when "$questionKeyName" is true',
    (keyofQuestionData) => {
      const { questionKeyName, optionName } = keyofQuestionData;
      render(<Question {...{ ...questionProps, [questionKeyName]: false }} />);
      expect(screen.getByRole("radio", { name: optionName })).not.toBeChecked();
    }
  );
});
