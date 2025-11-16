const modules = import.meta.glob("../lessons/*.md", {
  eager: true,
  as: "raw"
});

export interface LessonInfo {
  id: string;
  title: string;
  content: string;
}

function extractTitle(md: string) {
  const first = md.split("\n")[0];
  return first.replace("#", "").trim();
}

export function loadLessons(): LessonInfo[] {
  return Object.entries(modules).map(([path, mod]) => {
    const content = mod as string;
    const id = path.replace("../lessons/", "").replace(".md", "");

    return {
      id,
      title: extractTitle(content),
      content
    };
  });
}

export function getLessonById(id: string) {
  return loadLessons().find((l) => l.id === id);
}
