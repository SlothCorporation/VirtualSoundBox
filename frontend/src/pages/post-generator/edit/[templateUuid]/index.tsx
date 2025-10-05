import Layout from "@/components/Layout";
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postGeneratorEditSchema } from "@/schema/post-generator/edit";
import type { PostGeneratorEditSchema } from "@/schema/post-generator/edit";
import Input from "@/components/Form/Input";
import { useEffect, useState } from "react";
import { replacePlaceholders } from "@/lib/post-generator";
import { findTemplate, updateTemplate } from "@/hooks/postGenerator/api";
import { useRouter } from "next/router";
import Link from "next/link";

const dummyData = {
  liveTitle: "Sample Live Stream",
  liveUrl: "https://example.com/live-stream",
  setList: [
    {
      number: "1",
      music: "Sample Music",
      artist: "Sample Artist",
    },
    {
      number: "2",
      music: "Sample Music",
      artist: "Sample Artist",
    },
  ],
};

type TagButtonProps = {
  onClick: () => void;
  tag: string;
};

function TagButton({ onClick, tag }: TagButtonProps) {
  return (
    <button
      className="rounded bg-gray-200 px-3 py-1 text-sm font-medium shadow-md hover:bg-gray-300"
      type="button"
      onClick={onClick}
    >
      {tag}
    </button>
  );
}

type EditProps = {
  register: UseFormRegister<PostGeneratorEditSchema>;
  watch: UseFormWatch<PostGeneratorEditSchema>;
  setValue: UseFormSetValue<PostGeneratorEditSchema>;
};

function Index({ register, watch, setValue }: EditProps) {
  const handleInsertTag = (tag: string) => {
    const content = watch("content");
    const textarea = document.getElementById(
      "templateContent",
    ) as HTMLTextAreaElement;
    const cursorPos = textarea.selectionStart;
    const newContent =
      content.slice(0, cursorPos) + tag + content.slice(cursorPos);
    setValue("content", newContent, { shouldValidate: true });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <label>
          <input
            className="mr-2"
            type="radio"
            value="music"
            {...register("type")}
          />
          楽曲テンプレート
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            value="list"
            {...register("type")}
          />
          セトリテンプレート
        </label>
      </div>

      <Input label="テンプレート名" type="text" {...register("name")} />
      <textarea
        id="templateContent"
        className="h-52 w-full whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm"
        {...register("content")}
      />
      <div className="boder-gray-400 flex flex-wrap gap-2 rounded border p-2">
        <TagButton onClick={() => handleInsertTag("{{music}}")} tag="曲名" />
        <TagButton
          onClick={() => handleInsertTag("{{artist}}")}
          tag="アーティスト"
        />
        <TagButton onClick={() => handleInsertTag("{{number}}")} tag="番号" />
        <TagButton
          onClick={() => handleInsertTag("{{liveTitle}}")}
          tag="ライブタイトル"
        />
        <TagButton
          onClick={() => handleInsertTag("{{liveUrl}}")}
          tag="配信URL"
        />
        <TagButton
          onClick={() => handleInsertTag("@{{setList}}")}
          tag="セットリスト開始"
        />
        <TagButton
          onClick={() => handleInsertTag("@{{end}}")}
          tag="セットリスト終了"
        />
      </div>
    </div>
  );
}

type PreviewProps = {
  watch: UseFormWatch<PostGeneratorEditSchema>;
};

function Preview({ watch }: PreviewProps) {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    setGeneratedText(
      replacePlaceholders(watch("content"), {
        number: dummyData.setList[0].number,
        music: dummyData.setList[0].music,
        artist: dummyData.setList[0].artist,
        liveTitle: dummyData.liveTitle,
        liveUrl: dummyData.liveUrl,
        setList: dummyData.setList,
      }),
    );
  }, [dummyData, watch("content")]);

  return (
    <div className="mb-2 w-full grow whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm">
      {generatedText}
    </div>
  );
}

function EditForm() {
  const router = useRouter();
  const { templateUuid } = router.query;
  const uuid = Array.isArray(templateUuid) ? templateUuid[0] : templateUuid;

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostGeneratorEditSchema>({
    resolver: zodResolver(postGeneratorEditSchema),
    defaultValues: {
      type: "music",
      name: "テンプレート",
      content: "",
    },
    mode: "onSubmit",
  });

  const loadTemplateById = async () => {
    if (!uuid) return;

    const data = await findTemplate(uuid);
    setValue("type", data.type);
    setValue("name", data.name);
    setValue("content", data.content);
  };

  const onSubmit = async (data: PostGeneratorEditSchema) => {
    if (!uuid) {
      console.log("テンプレートのUUIDが指定されていません");
      return;
    }
    try {
      await updateTemplate({ uuid, ...data });
    } catch (err) {
      console.log("テンプレートの更新に失敗しました");
    }
  };

  useEffect(() => {
    loadTemplateById();
  }, [templateUuid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-5">
          <Index register={register} watch={watch} setValue={setValue} />
          <Preview watch={watch} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            <Link
              href="/post-generator/edit"
              className="text-blue-600 underline"
            >
              {"< 戻る"}
            </Link>
          </div>
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            保存
          </button>
        </div>
      </div>
    </form>
  );
}

function Page() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">テンプレート編集</h1>
        <EditForm />
      </div>
    </Layout>
  );
}

export default Page;
