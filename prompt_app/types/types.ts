export interface PromptData {
    id: number;
    prompt: string;
    created_at: string;
  }

export interface ResponseData {
  id: number;
  prompt: string;
  audio: Blob;
  transcript: string;
  created_at: Date;
  expires_at: Date;
  identity: string;
}
