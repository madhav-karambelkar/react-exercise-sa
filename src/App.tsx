import React, { useEffect, useMemo, useState } from "react";
import QUESTIONS from "./questions";
import Question from "./component/Question/Question";

type StoreData = Record<"yesAnswers" | "noAnswers", string[]>;

export default function App() {
  const [yesAnswers, setYesAnswers] = useState<string[]>([]);
  const [noAnswers, setNoAnswers] = useState<string[]>([]);
  const [showData, setShowData] = useState(false);

  // MEMOIZE THE CALCULATION AND GET CALCULATED DATA
  const answersResult = useMemo(() => {
    const allAnswers = [...yesAnswers, ...noAnswers];
    const totalLength = allAnswers.length;
    const newAverageScore = yesAnswers.length / QUESTIONS.length;
    const score = (yesAnswers.length / QUESTIONS.length) * 100;
    return {
      totalLength,
      newAverageScore,
      score,
    };
  }, [yesAnswers, noAnswers]);

  // STORING IN LOCAL STORAGE
  useEffect(() => {
    if (showData) {
      localStorage.setItem(
        "answersData",
        JSON.stringify({ yesAnswers, noAnswers })
      );
    }
  }, [showData, yesAnswers, noAnswers]);

  // RETRIEVING DATA FROM STORAGE INITIAL AS "showData" is False
  useEffect(() => {
    if (!showData) {
      const storedData = localStorage.getItem("answersData");
      if (storedData) {
        const parsedStoreData: StoreData = JSON.parse(storedData);
        setNoAnswers(parsedStoreData.noAnswers);
        setYesAnswers(parsedStoreData.yesAnswers);
      }
    }
  }, [showData]);

  /** Resetting All States */
  const onReset = () => {
    setYesAnswers([]);
    setNoAnswers([]);
    setShowData(false);
    localStorage.clear();
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div>TODO</div>
        <form
          noValidate
          onSubmit={(s) => {
            s.preventDefault();
            setShowData(true);
          }}
        >
          {QUESTIONS.map((que) => (
            <Question
              key={que.id}
              questionData={que}
              isYesAnswerChecked={
                yesAnswers.length
                  ? yesAnswers.some((ansId) => ansId === que.id)
                  : false
              }
              onChangeYes={() => {
                const removedAnswers = noAnswers.filter((id) => id !== que.id);
                setNoAnswers(removedAnswers);
                setYesAnswers((prev) => [...prev, que.id]);
              }}
              isNoAnswerChecked={
                noAnswers.length
                  ? noAnswers.some((ansId) => ansId === que.id)
                  : false
              }
              onChangeNo={() => {
                const removedAnswers = yesAnswers.filter((id) => id !== que.id);
                setYesAnswers(removedAnswers);
                setNoAnswers((prev) => [...prev, que.id]);
              }}
            />
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={onReset}>
            Reset
          </button>
          {/* CONDITION TO DISPLAY RESULT WHEN CLICKED ON "Submits"  */}
          {showData && answersResult.totalLength > 0 && (
            <>
              <span>Score: {answersResult.score}</span>
              <span>Average Score: {answersResult.newAverageScore}</span>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
