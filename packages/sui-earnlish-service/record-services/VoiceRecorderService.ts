import { type IFetcher, Fetcher } from '@suiEarnLish/fetcher';

export type Sentence = {
  id: string;
  text: string;
  level: number;
  createdAt: string; // ISO date string
};

export class VoiceRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private fetcher: IFetcher = new Fetcher();

  public audioBlob: Blob | null = null;
  public audioUrl: string | null = null;

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, {
        type: 'audio/webm; codecs=opus',
      });
      this.audioUrl = URL.createObjectURL(this.audioBlob);
      console.log(':audioUrl', this.audioUrl);
    };

    this.mediaRecorder.start();
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.stream?.getTracks().forEach((track) => track.stop());
    }
  }

  async getRandomSentence(): Promise<Sentence[]> {
    const res = await this.fetcher.get<Sentence[]>(
      '/api/lesson/sentences'
    );
    return res;
  }

  async upload(
    originalText: string,
    endpoint: string = '/api/transcribe'
  ): Promise<any> {
    if (!this.audioBlob) throw new Error('No audio recorded yet.');

    const file = new File([this.audioBlob], 'voice.webm', {
      type: 'audio/webm',
    });

    const response = await this.fetcher.upload(endpoint, file, 'audio', {
      originalText,
    });

    return response;
  }
}
