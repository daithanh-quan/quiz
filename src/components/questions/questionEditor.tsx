import { useFieldArray, useFormContext } from "react-hook-form";

import TiptapEditor from "src/components/tiptapEditor";

const QuestionEditor = () => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const answerType = watch("answerType");
  const correctAnswers = watch("correctAnswers") || [];

  const handleCorrectAnswerChange = (index) => {
    if (answerType === "radio") {
      setValue("correctAnswers", [index]);
    } else {
      const newCorrectAnswers = correctAnswers.includes(index)
        ? correctAnswers.filter((i) => i !== index)
        : [...correctAnswers, index];
      setValue("correctAnswers", newCorrectAnswers);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 p-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Loại câu trả lời
        </label>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="checkbox"
              checked={answerType === "checkbox"}
              onChange={(e) => {
                setValue("answerType", e.target.value);
                setValue("correctAnswers", []);
              }}
              className="h-4 w-4"
            />
            <span>Nhiều đáp án đúng (Checkbox)</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="radio"
              checked={answerType === "radio"}
              onChange={(e) => {
                setValue("answerType", e.target.value);
                setValue("correctAnswers", []);
              }}
              className="h-4 w-4"
            />
            <span>Một đáp án đúng (Radio)</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Câu hỏi <span className="text-red-500">*</span>
        </label>
        <TiptapEditor
          value={watch("question")}
          onChange={(content) => setValue("question", content)}
          placeholder="Nhập câu hỏi của bạn..."
        />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Câu trả lời <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => append({ content: "" })}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
          >
            + Thêm câu trả lời
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-3">
              <div className="pt-4">
                <input
                  type={answerType}
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleCorrectAnswerChange(index)}
                  className="h-5 w-5 cursor-pointer"
                  title="Đánh dấu là đáp án đúng"
                />
              </div>

              <div className="flex-1">
                <TiptapEditor
                  value={watch(`answers.${index}.content`)}
                  onChange={(content) =>
                    setValue(`answers.${index}.content`, content)
                  }
                  placeholder={`Câu trả lời ${index + 1}...`}
                />
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                    const newCorrectAnswers = correctAnswers
                      .filter((i) => i !== index)
                      .map((i) => (i > index ? i - 1 : i));
                    setValue("correctAnswers", newCorrectAnswers);
                  }}
                  className="mt-2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
