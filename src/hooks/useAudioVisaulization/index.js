import { ref } from 'vue'
import { clearCanvas, clearFloats, drawBars, drawFloats } from './drawUtils'

const useAudioVisualization = (el, len = 50) => {
  const audioCtx = ref(null)
  const analyser = ref(null)
  const requestAnimateFrameId = ref(null)

  const drawEachFrame = (canvasEl, dataArr) => {
    requestAnimateFrameId.value = requestAnimationFrame(() =>
      drawEachFrame(canvasEl, dataArr)
    )

    if (analyser.value) {
      analyser.value.getByteFrequencyData(dataArr)
      const bars = dataArr.slice(0, Math.min(len, dataArr.length))

      // draw
      clearCanvas(canvasEl)
      drawFloats(canvasEl, bars)
      drawBars(canvasEl, bars)
    }
  }

  const visualize = (stream) => {
    const canvasEl = document.querySelector(el)
    if (!canvasEl) {
      throw new Error('can not find canvas')
    }

    audioCtx.value = new AudioContext()
    analyser.value = audioCtx.value.createAnalyser()

    const source = audioCtx.value.createMediaStreamSource(stream)
    source.connect(analyser.value)

    analyser.value.fftSize = 256
    const bufLen = analyser.value.frequencyBinCount
    const dataArr = new Uint8Array(bufLen)

    drawEachFrame(canvasEl, dataArr)
  }

  const resetCanvas = () => {
    const canvasEl = document.querySelector(el)
    if (canvasEl) {
      const emptyDataArr = new Uint8Array(len).map(() => 0)
      clearFloats()
      clearCanvas(canvasEl)
      drawFloats(canvasEl, emptyDataArr)
    }
  }

  const stopVisualize = () => {
    if (requestAnimateFrameId.value) {
      window.cancelAnimationFrame(requestAnimateFrameId.value)
      resetCanvas()
    }
  }

  return {
    visualize,
    stopVisualize,
    resetCanvas,
    requestAnimateFrameId,
  }
}
export default useAudioVisualization
