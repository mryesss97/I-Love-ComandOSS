export class VoiceRecorderService {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private stream: MediaStream | null = null
  public audioBlob: Blob | null = null
  public audioUrl: string | null = null

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    this.mediaRecorder = new MediaRecorder(this.stream)
    this.audioChunks = []

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data)
      }
    }

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
      this.audioUrl = URL.createObjectURL(this.audioBlob)
    }

    this.mediaRecorder.start()
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
      this.stream?.getTracks().forEach((track) => track.stop())
    }
  }

  async upload(endpoint: string = '/api/transcribe'): Promise<any> {
    if (!this.audioBlob) throw new Error('No audio recorded yet.')

    const formData = new FormData()
    formData.append('file', this.audioBlob)

    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData
    })

    return res.json()
  }
}