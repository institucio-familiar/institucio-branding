export function initFontPreviews() {
  const destroyFns: (() => void)[] = []

  document.querySelectorAll<HTMLElement>('[data-font-preview]').forEach((root) => {
    const text = root.querySelector<HTMLElement>('[data-font-preview-text]')
    const sizeInput = root.querySelector<HTMLInputElement>('[data-font-preview-size]')
    const sizeLabel = root.querySelector<HTMLElement>('[data-font-preview-size-label]')
    const weightBtn = root.querySelector<HTMLButtonElement>('[data-font-preview-weight]')

    if (!text || !sizeInput || !sizeLabel || !weightBtn) return

    const regularWeight = Number(root.dataset.regularWeight) || 400
    const boldWeight = Number(root.dataset.boldWeight) || 700
    const regularLabel = root.dataset.regularLabel || 'Regular'
    const boldLabel = root.dataset.boldLabel || 'Bold'

    let isBold = false

    const updateSizeLabel = () => {
      const min = Number(sizeInput.min)
      const max = Number(sizeInput.max)
      const value = Number(sizeInput.value)

      sizeLabel.textContent = `${value}px`
      text.style.fontSize = `${value}px`

      const percent = (value - min) / (max - min)
      const thumbWidth = 10
      const trackWidth = sizeInput.offsetWidth
      const offset = percent * (trackWidth - thumbWidth) + thumbWidth / 2

      sizeLabel.style.left = `${offset}px`
    }

    const updateWeight = () => {
      text.style.fontWeight = String(isBold ? boldWeight : regularWeight)
      weightBtn.textContent = isBold ? boldLabel : regularLabel
      weightBtn.setAttribute('aria-pressed', String(isBold))
    }

    const onSizeInput = () => updateSizeLabel()
    const onWeightClick = () => {
      isBold = !isBold
      updateWeight()
    }
    const onResize = () => updateSizeLabel()

    sizeInput.addEventListener('input', onSizeInput)
    weightBtn.addEventListener('click', onWeightClick)
    window.addEventListener('resize', onResize)

    updateSizeLabel()
    updateWeight()

    destroyFns.push(() => {
      sizeInput.removeEventListener('input', onSizeInput)
      weightBtn.removeEventListener('click', onWeightClick)
      window.removeEventListener('resize', onResize)
    })
  })

  return () => destroyFns.forEach((fn) => fn())
}
