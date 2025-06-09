type TemplateVariables = {
  [key: string]: string | string[] | { [key: string]: string }[];
};

export function replacePlaceholders(
  template: string,
  variables: TemplateVariables,
): string {
  return template
    .replace(
      /@{{(\w+)}}([\s\S]*?)@{{end}}/g,
      (_, key: string, content: string) => {
        if (Array.isArray(variables[key])) {
          return (variables[key] as { [key: string]: string }[])
            .map((item) =>
              content
                .replace(
                  /{{(.*?)}}/g,
                  (_, varKey: string) => item[varKey.trim()] || "",
                )
                .trim(),
            )
            .join("\n");
        }
        return content.trim();
      },
    )
    .replace(/{{(.*?)}}/g, (_, key: string) =>
      String(variables[key.trim()] || ""),
    );
}
