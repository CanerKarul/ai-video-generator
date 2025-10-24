export type AspectRatio = '16:9' | '9:16';

export interface PresetPrompt {
  id: string;
  title: string;
  prompt: string;
}

// FIX: Centralized AIStudio interface and global window.aistudio declaration to resolve type conflicts across files.
// FIX: Moved AIStudio interface into declare global to resolve "Subsequent property declarations must have the same type" error.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // FIX: Made `aistudio` optional ('?') to reflect its conditional existence in the runtime environment and resolve the declaration conflict.
    aistudio?: AIStudio;
  }
}
