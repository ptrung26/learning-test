// Load toàn bộ config.json của extensions
const configModules = import.meta.glob("./*/config.json", { eager: true });
const viewModules = import.meta.glob("./*/*.tsx", { eager: true });

export interface ExtensionInfo {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
}

// Danh sách extension
export const extensions: ExtensionInfo[] = Object.entries(configModules).map(
  ([, mod]: any) => {
    const id = mod.id;
    const view = Object.entries(viewModules).find(([vpath]) =>
      vpath.includes(`/${id}/`)
    );

    return {
      id,
      name: mod.name,
      description: mod.description,
      component: (view?.[1] as any)?.default,
    };
  }
);

export function getExtensionById(id: string) {
  return extensions.find((x) => x.id === id);
}
