"use client";

import { useMemo, useState } from "react";
import { ActiveMathQuestion, buildMedMathSet } from "./medMathData";
import { allQuestions, chapterNames, drugCards, Question, studyTerms } from "./studyData";

type View = "setup" | "quiz" | "glossary" | "drugs" | "medmath";
type Weights = { pharm: number; research: number; foundation: number };

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const effectiveWeights = (weights: Weights) => {
  const total = weights.pharm + weights.research + weights.foundation || 1;
  return {
    pharm: Math.round((weights.pharm / total) * 100),
    research: Math.round((weights.research / total) * 100),
    foundation: Math.round((weights.foundation / total) * 100),
  };
};

const buildQuiz = (count: number, weights: Weights) => {
  const total = weights.pharm + weights.research + weights.foundation || 1;
  const requested = {
    pharm: Math.round(count * weights.pharm / total),
    research: Math.round(count * weights.research / total),
    foundation: 0,
  };
  requested.foundation = count - requested.pharm - requested.research;

  const pools = {
    pharm: shuffle(allQuestions.filter((q) => q.chapter === "20")),
    research: shuffle(allQuestions.filter((q) => q.chapter === "5")),
    foundation: shuffle(allQuestions.filter((q) => ["1", "2", "3", "4"].includes(q.chapter))),
  };

  const chosen = [
    ...pools.pharm.slice(0, requested.pharm),
    ...pools.research.slice(0, requested.research),
    ...pools.foundation.slice(0, requested.foundation),
  ];
  const used = new Set(chosen.map((q) => q.id));
  if (chosen.length < count) {
    chosen.push(...shuffle(allQuestions.filter((q) => !used.has(q.id))).slice(0, count - chosen.length));
  }
  return shuffle(chosen).map((q) => ({ ...q, options: shuffle(q.options) }));
};

export default function Home() {
  const [view, setView] = useState<View>("setup");
  const [questionCount, setQuestionCount] = useState(50);
  const [weights, setWeights] = useState<Weights>({ pharm: 50, research: 30, foundation: 20 });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [answers, setAnswers] = useState<{ question: Question; selected: string; correct: boolean }[]>([]);
  const [search, setSearch] = useState("");
  const [chapterFilter, setChapterFilter] = useState("all");
  const [mathQuestions, setMathQuestions] = useState<ActiveMathQuestion[]>(() => buildMedMathSet(false));
  const [mathAnswers, setMathAnswers] = useState<Record<string, string>>({});
  const [mathChecked, setMathChecked] = useState<Record<string, boolean>>({});
  const [mathHints, setMathHints] = useState<Record<string, boolean>>({});
  const [formulaWork, setFormulaWork] = useState<Record<string, string[]>>({});
  const [formulaChecked, setFormulaChecked] = useState<Record<string, boolean>>({});
  const effective = effectiveWeights(weights);

  const startQuiz = () => {
    setQuestions(buildQuiz(questionCount, weights));
    setCurrent(0);
    setSelected(null);
    setHintOpen(false);
    setAnswers([]);
    setView("quiz");
  };

  const chooseAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[current];
    setAnswers((old) => [...old, { question: q, selected: option, correct: option === q.answer }]);
  };

  const nextQuestion = () => {
    setCurrent((old) => old + 1);
    setSelected(null);
    setHintOpen(false);
  };

  const filteredTerms = useMemo(() => {
    const query = search.toLowerCase().trim();
    return studyTerms.filter((item) =>
      (chapterFilter === "all" || item.chapter === chapterFilter) &&
      (!query || item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query))
    );
  }, [search, chapterFilter]);

  const filteredDrugs = useMemo(() => {
    const query = search.toLowerCase().trim();
    return drugCards.filter((drug) => !query || Object.values(drug).some((value) => value.toLowerCase().includes(query)));
  }, [search]);

  const resetTo = (nextView: View) => {
    setView(nextView);
    setSearch("");
    setChapterFilter("all");
  };

  const makeMathSet = (randomTimes: boolean) => {
    setMathQuestions(buildMedMathSet(randomTimes));
    setMathAnswers({});
    setMathChecked({});
    setMathHints({});
    setFormulaWork({});
    setFormulaChecked({});
  };

  const checkMathAnswer = (question: ActiveMathQuestion) => {
    if (mathAnswers[question.id]?.trim()) setMathChecked((old) => ({ ...old, [question.id]: true }));
  };

  const addFormulaPiece = (questionId: string, piece: string) => {
    setFormulaWork((old) => old[questionId]?.includes(piece) ? old : { ...old, [questionId]: [...(old[questionId] ?? []), piece] });
    setFormulaChecked((old) => ({ ...old, [questionId]: false }));
  };

  const checkFormula = (question: ActiveMathQuestion) => setFormulaChecked((old) => ({ ...old, [question.id]: true }));

  const score = answers.filter((answer) => answer.correct).length;
  const finished = view === "quiz" && questions.length > 0 && current >= questions.length;

  return (
    <main>
      <header className="header">
        <button className="site-title" onClick={() => resetTo("setup")}>Paramedic Exam 1 Practice</button>
        <nav>
          <button onClick={() => resetTo("setup")} className={view === "setup" ? "active" : ""}>New test</button>
          <button onClick={() => resetTo("glossary")} className={view === "glossary" ? "active" : ""}>Key terms</button>
          <button onClick={() => resetTo("drugs")} className={view === "drugs" ? "active" : ""}>Medication sheet</button>
          <button onClick={() => resetTo("medmath")} className={view === "medmath" ? "active" : ""}>Med math</button>
        </nav>
      </header>

      {view === "setup" && (
        <div className="container setup-page">
          <h1>Exam 1 practice test</h1>
          <p className="intro">Questions from Chapters 1-5 and 20, the 2011 study guide, and Medication Sheet 1. Every test reshuffles the questions and answer order.</p>

          <section className="card settings-card">
            <h2>Make a test</h2>
            <div className="setting-block">
              <div className="setting-label"><label htmlFor="question-count">Number of questions</label><b>{questionCount}</b></div>
              <input id="question-count" type="range" min="10" max="100" step="5" value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} />
              <div className="quick-counts">
                {[20, 40, 50, 75, 100].map((count) => <button key={count} onClick={() => setQuestionCount(count)} className={questionCount === count ? "selected" : ""}>{count}</button>)}
              </div>
            </div>

            <div className="setting-block">
              <div className="setting-label"><span>Question weights</span><small>effective: {effective.pharm}% / {effective.research}% / {effective.foundation}%</small></div>
              <WeightSlider label="Chapter 20 - Pharmacology" value={weights.pharm} onChange={(value) => setWeights({ ...weights, pharm: value })} />
              <WeightSlider label="Chapter 5 - Research" value={weights.research} onChange={(value) => setWeights({ ...weights, research: value })} />
              <WeightSlider label="Chapters 1-4" value={weights.foundation} onChange={(value) => setWeights({ ...weights, foundation: value })} />
              <p className="help-text">The sliders are relative. They do not have to add up to 100.</p>
            </div>

            <button className="primary-button" onClick={startQuiz}>Start {questionCount}-question test</button>
          </section>

          <section className="plain-section">
            <h2>What is included</h2>
            <div className="stats-row">
              <div><b>{allQuestions.length}</b><span>base questions</span></div>
              <div><b>{studyTerms.length}</b><span>key terms</span></div>
              <div><b>{drugCards.length}</b><span>medications</span></div>
              <div><b>6</b><span>chapters</span></div>
            </div>
            <ul>
              <li>Hint available on every question</li>
              <li>Instant answer and explanation after each response</li>
              <li>Medication names, brands, classes, actions, uses, contraindications, doses, routes, and adverse effects</li>
              <li>Roles of EMS practitioners, ambulance types, medication routes, and every listed chapter term</li>
            </ul>
          </section>
        </div>
      )}

      {view === "quiz" && !finished && questions[current] && (
        <div className="container quiz-page">
          <div className="quiz-topline">
            <button className="text-button" onClick={() => resetTo("setup")}>← Quit test</button>
            <span>Score: {score}/{answers.length}</span>
          </div>
          <div className="progress"><span style={{ width: `${(current / questions.length) * 100}%` }} /></div>
          <section className="card question-card">
            <div className="question-info">
              <span>Question {current + 1} of {questions.length}</span>
              <span>Chapter {questions[current].chapter}: {chapterNames[questions[current].chapter]}</span>
            </div>
            <h2>{questions[current].prompt}</h2>
            <div className="options">
              {questions[current].options.map((option, index) => {
                const answered = Boolean(selected);
                const isCorrect = answered && option === questions[current].answer;
                const isWrong = answered && option === selected && option !== questions[current].answer;
                return (
                  <button key={option} onClick={() => chooseAnswer(option)} disabled={answered} className={`${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}>
                    <span>{String.fromCharCode(65 + index)}</span>{option}
                  </button>
                );
              })}
            </div>

            {!selected && (
              <div className="question-actions">
                <button className="secondary-button" onClick={() => setHintOpen(!hintOpen)}>{hintOpen ? "Hide hint" : "Show hint"}</button>
                {hintOpen && <p className="hint"><b>Hint:</b> {questions[current].hint}</p>}
              </div>
            )}

            {selected && (
              <div className={`feedback ${selected === questions[current].answer ? "right-feedback" : "wrong-feedback"}`}>
                <h3>{selected === questions[current].answer ? "Correct" : "Not quite"}</h3>
                {selected !== questions[current].answer && <p><b>Correct answer:</b> {questions[current].answer}</p>}
                <p>{questions[current].explanation}</p>
                <button className="primary-button" onClick={nextQuestion}>{current === questions.length - 1 ? "See results" : "Next question"}</button>
              </div>
            )}
          </section>
        </div>
      )}

      {finished && (
        <div className="container results-page">
          <section className="card results-card">
            <h1>Finished</h1>
            <div className="big-score">{Math.round((score / questions.length) * 100)}%</div>
            <p>You got {score} out of {questions.length} correct.</p>
            <div className="result-buttons">
              <button className="primary-button" onClick={startQuiz}>Retake with new questions</button>
              <button className="secondary-button" onClick={() => resetTo("setup")}>Change test settings</button>
            </div>
          </section>
          {answers.some((answer) => !answer.correct) && (
            <section className="plain-section review-section">
              <h2>Questions to review</h2>
              {answers.filter((answer) => !answer.correct).map((answer, index) => (
                <details key={`${answer.question.id}-${index}`}>
                  <summary>{answer.question.prompt}</summary>
                  <p><b>Your answer:</b> {answer.selected}</p>
                  <p><b>Correct answer:</b> {answer.question.answer}</p>
                  <p>{answer.question.explanation}</p>
                </details>
              ))}
            </section>
          )}
        </div>
      )}

      {view === "glossary" && (
        <div className="container reference-page">
          <h1>Key terms</h1>
          <p className="intro">All {studyTerms.length} listed terms. Search by term or definition.</p>
          <div className="filters">
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search key terms..." />
            <select value={chapterFilter} onChange={(event) => setChapterFilter(event.target.value)}>
              <option value="all">All chapters</option>
              {["1","2","3","4","5","20"].map((chapter) => <option key={chapter} value={chapter}>Chapter {chapter}</option>)}
            </select>
          </div>
          <p className="result-count">Showing {filteredTerms.length} terms</p>
          <div className="term-list">
            {filteredTerms.map((item) => (
              <article key={`${item.chapter}-${item.term}`}>
                <div><b>{item.term}</b><span>Ch. {item.chapter}</span></div>
                <p>{item.definition}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {view === "drugs" && (
        <div className="container reference-page">
          <h1>Medication Sheet 1</h1>
          <p className="intro">Opioids, nonopioids, antagonists, sedatives, and related agents from the attached course sheet.</p>
          <div className="filters"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search medications..." /></div>
          <div className="drug-list">
            {filteredDrugs.map((drug) => (
              <details key={drug.generic}>
                <summary><b>{drug.generic}</b><span>{drug.brand} · {drug.classification}</span></summary>
                <div className="drug-grid">
                  <DrugField label="Action" value={drug.action} />
                  <DrugField label="Indications" value={drug.indications} />
                  <DrugField label="Contraindications" value={drug.contraindications} />
                  <DrugField label="Dose" value={drug.dose} />
                  <DrugField label="Routes" value={drug.routes} />
                  <DrugField label="Adverse effects" value={drug.adverse} />
                  <DrugField label="Course note" value={drug.note} />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {view === "medmath" && (
        <div className="container math-page">
          <h1>Med math practice</h1>
          <p className="intro">Static dosage, pump, and gravity-drip calculations. New sets start with one-hour hangs; the random-time button uses 30, 45, or 60 minutes where the calculation involves a time.</p>
          <div className="math-actions">
            <button className="primary-button" onClick={() => makeMathSet(false)}>New 1-hour set</button>
            <button className="secondary-button" onClick={() => makeMathSet(true)}>Random EMS times</button>
          </div>
          <div className="math-legend"><span>IV push</span><span>Pump rate</span><span>Drip rate</span></div>
          <div className="math-list">
            {mathQuestions.map((question, index) => {
              const submitted = mathChecked[question.id];
              const entered = Number(mathAnswers[question.id]);
              const correct = submitted && Number.isFinite(entered) && Math.abs(entered - question.answer(question.minutes)) < 0.06;
              const builtFormula = formulaWork[question.id] ?? [];
              const formulaCorrect = builtFormula.length === question.equation.length && builtFormula.every((piece, pieceIndex) => piece === question.equation[pieceIndex]);
              return (
                <article className="math-card" key={question.id}>
                  <div className="math-heading"><span>#{index + 1} · {question.type}</span><span>Answer in {question.unit}</span></div>
                  <h2>{question.prompt(question.minutes)}</h2>
                  <div className="formula-builder">
                    <div className="formula-bank">
                      <b>Formula pieces</b>
                      <p>Drag or tap each piece to build the setup.</p>
                      <div className="formula-pieces">
                        {question.formulaPieces.filter((piece) => !builtFormula.includes(piece)).map((piece) => <button key={piece} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", piece)} onClick={() => addFormulaPiece(question.id, piece)}>{piece}</button>)}
                      </div>
                    </div>
                    <div className="formula-workspace" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFormulaPiece(question.id, event.dataTransfer.getData("text/plain")); }}>
                      <b>Equation workspace</b>
                      <div className="equation-line">
                        {builtFormula.length ? builtFormula.map((piece) => <button key={piece} title="Remove piece" onClick={() => { setFormulaWork((old) => ({ ...old, [question.id]: (old[question.id] ?? []).filter((item) => item !== piece) })); setFormulaChecked((old) => ({ ...old, [question.id]: false })); }}>{piece}</button>) : <span>Drop formula pieces here</span>}
                      </div>
                    </div>
                  </div>
                  <div className="formula-actions">
                    <button className="secondary-button" disabled={!builtFormula.length} onClick={() => checkFormula(question)}>Check setup</button>
                    {builtFormula.length > 0 && <button className="text-button" onClick={() => { setFormulaWork((old) => ({ ...old, [question.id]: [] })); setFormulaChecked((old) => ({ ...old, [question.id]: false })); }}>Clear setup</button>}
                  </div>
                  {formulaChecked[question.id] && <p className={`formula-result ${formulaCorrect ? "formula-right" : "formula-wrong"}`}>{formulaCorrect ? "Formula setup looks right. Now plug in the numbers." : "Not quite. Check the units and which quantity should be divided by time or concentration."}</p>}
                  <div className="math-answer-row">
                    <label>
                      <span>Your answer</span>
                      <input inputMode="decimal" type="number" step="any" value={mathAnswers[question.id] ?? ""} disabled={submitted} onChange={(event) => setMathAnswers((old) => ({ ...old, [question.id]: event.target.value }))} placeholder="0" />
                    </label>
                    <b>{question.unit}</b>
                    {!submitted && <button className="primary-button" onClick={() => checkMathAnswer(question)}>Check</button>}
                  </div>
                  {!submitted && <button className="text-button" onClick={() => setMathHints((old) => ({ ...old, [question.id]: !old[question.id] }))}>{mathHints[question.id] ? "Hide hint" : "Show hint"}</button>}
                  {!submitted && mathHints[question.id] && <p className="hint"><b>Hint:</b> {question.hint}</p>}
                  {submitted && <div className={`math-feedback ${correct ? "right-feedback" : "wrong-feedback"}`}>
                    <h3>{correct ? "Correct" : "Not quite"}</h3>
                    {!correct && <p><b>Correct answer:</b> {question.answer(question.minutes)} {question.unit}</p>}
                    <p>{question.formula(question.minutes)}</p>
                  </div>}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}

function WeightSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="weight-slider">
      <label><span>{label}</span><b>{value}</b></label>
      <input type="range" min="0" max="100" step="5" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

function DrugField({ label, value }: { label: string; value: string }) {
  return <div><b>{label}</b><p>{value}</p></div>;
}
