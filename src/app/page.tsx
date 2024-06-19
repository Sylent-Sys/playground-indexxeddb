"use client";
import { useEffect, useState } from "react";
import { db } from "../../db/idb";
import { Sample } from "../../data/ISample";

export default function Home() {
  const [sampleData, setSampleData] = useState<Sample | null>(null);
  async function updateCacheLearning(data: Sample) {
    const dataString = JSON.stringify(data);
    await db.cacheLearning.put({ id: 1, data: dataString });
  }
  async function getCacheLearning() {
    const data = await db.cacheLearning.get(1);
    if (data) {
      setSampleData(JSON.parse(data.data));
      return true;
    }
    return false;
  }
  useEffect(() => {
    getCacheLearning().then((value) => {
      if (value == false) {
        fetch("/api/sample")
          .then((res) => res.json())
          .then((data) => {
            setSampleData(data);
            updateCacheLearning(data);
          });
      }
    });
  }, []);
  return (
    <main className="p-20">
      <h1>Sample Data</h1>
      {sampleData ? (
        <div>
          {sampleData.learning_materials.map((learningMaterial) => (
            <div key={learningMaterial.id}>
              <h3>Questions</h3>
              {learningMaterial.questions.map((question) => (
                <div key={question.id}>
                  <h4>Multiple Choices</h4>
                  {question.multiple_choices.map((multipleChoice) => (
                    <div key={multipleChoice.id}>
                      <input
                        type="radio"
                        name={question.id}
                        value={multipleChoice.id}
                        placeholder="Multiple Choice"
                        onChange={(e) => {
                          const newData = sampleData.learning_materials.map(
                            (lm) => {
                              if (lm.id === learningMaterial.id) {
                                return {
                                  ...lm,
                                  questions: lm.questions.map((q) => {
                                    if (q.id === question.id) {
                                      return {
                                        ...q,
                                        idJawabanUser: e.target.value,
                                      };
                                    }
                                    return q;
                                  }),
                                };
                              }
                              return lm;
                            }
                          );
                          setSampleData({ learning_materials: newData });
                          updateCacheLearning({
                            ...sampleData,
                            learning_materials: newData,
                          });
                        }}
                        checked={question.idJawabanUser === multipleChoice.id}
                      />
                      <label>{multipleChoice.content}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
