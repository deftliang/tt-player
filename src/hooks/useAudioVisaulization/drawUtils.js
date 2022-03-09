// 浮动的小块
let floats = []
// 推的高度
const PUSH_HEIGHT = 0
// 高度
const FLOAT_HEIGHT = 4
// 下落高度
const DROP_DISTANCE = 1
// Bar 的 border 宽度
const BORDER_WIDTH = 1
// 高度比例
const HEIGHT_RATIO = 1

export const clearFloats = () => (floats = [])

export const clearCanvas = (canvasEl) => {
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height
  const canvasCtx = canvasEl.getContext('2d')

  if (!canvasCtx) {
    return
  }

  // 绘制图形
  canvasCtx.fillStyle = 'rgb(29,19,62)'
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight)
}

export const drawFloats = (canvasEl, dataArray) => {
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height
  const canvasCtx = canvasEl.getContext('2d')

  if (!canvasCtx) {
    return
  }

  // 找到最大值，以及初始化高度
  dataArray.forEach((item, index) => {
    // 默认值
    floats[index] = floats[index] || FLOAT_HEIGHT
    // 处理当前值
    const pushHeight = item + FLOAT_HEIGHT + PUSH_HEIGHT
    const dropHeight = floats[index] - DROP_DISTANCE
    // 取最大值
    floats[index] = Math.max(dropHeight, pushHeight)
  })

  const barWidth = canvasWidth / dataArray.length
  let x = 0

  floats.forEach((floatItem) => {
    const floatHeight = floatItem * HEIGHT_RATIO

    canvasCtx.fillStyle = '#3e47a0'
    canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT)

    x += barWidth + BORDER_WIDTH
  })
}

export const drawBars = (canvasEl, dataArray) => {
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height
  const canvasCtx = canvasEl.getContext('2d')

  if (!canvasCtx) {
    return
  }

  const barWidth = canvasWidth / dataArray.length
  let x = 0

  dataArray.forEach((dataItem) => {
    const barHeight = dataItem * HEIGHT_RATIO

    // 添加渐变色
    const gradient = canvasCtx.createLinearGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth / 2,
      canvasHeight
    )
    gradient.addColorStop(0, '#68b3ec')
    gradient.addColorStop(0.5, '#4b5fc9')
    gradient.addColorStop(1, '#68b3ec')

    // 画 bar
    canvasCtx.fillStyle = gradient
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight)

    x += barWidth + BORDER_WIDTH
  })
}
