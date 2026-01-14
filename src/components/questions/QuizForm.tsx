import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import QuestionEditor from "./questionEditor";

export default function QuizForm() {
  const [submittedData, setSubmittedData] = useState(null);

  const methods = useForm({
    defaultValues: {
      answerType: "checkbox",
      question: "",
      answers: [{ content: "" }, { content: "" }],
      correctAnswers: [],
    },
  });

  const onSubmit = (data) => {
    // Validate
    if (!data.question || data.question === "<p></p>") {
      alert("Vui lòng nhập câu hỏi!");
      return;
    }

    const hasEmptyAnswer = data.answers.some(
      (answer) => !answer.content || answer.content === "<p></p>",
    );
    if (hasEmptyAnswer) {
      alert("Vui lòng nhập tất cả câu trả lời!");
      return;
    }

    if (data.correctAnswers.length === 0) {
      alert("Vui lòng chọn ít nhất một đáp án đúng!");
      return;
    }

    setSubmittedData(data);
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Tạo câu hỏi Quiz
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <QuestionEditor />

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Lưu câu hỏi
              </button>
              <button
                type="button"
                onClick={() => methods.reset()}
                className="rounded-lg bg-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </form>
        </FormProvider>

        {/* Hiển thị kết quả */}
        {submittedData && (
          <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-green-800">
              ✓ Câu hỏi đã được lưu!
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Loại:</strong>{" "}
                {submittedData.answerType === "checkbox"
                  ? "Nhiều đáp án"
                  : "Một đáp án"}
              </div>
              <div>
                <strong>Câu hỏi:</strong>
                <div
                  className="mt-1 rounded border bg-white p-2"
                  dangerouslySetInnerHTML={{ __html: submittedData.question }}
                />
              </div>
              <div>
                <strong>Số câu trả lời:</strong> {submittedData.answers.length}
              </div>
              <div>
                <strong>Đáp án đúng:</strong>{" "}
                {submittedData.correctAnswers
                  .map((i) => `Câu ${i + 1}`)
                  .join(", ")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
