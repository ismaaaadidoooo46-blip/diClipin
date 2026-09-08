export interface Clip {
  id: string;
  title: string;
  duration: string;
  topic: string;
  viralityScore: number;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface IngestResponse {
  success: boolean;
  jobId?: string;
  message: string;
}
