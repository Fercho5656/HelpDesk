export default function useChartColor() {
  const bgColor = computed(() => {
    const isDark = useDark()
    return isDark.value ?
      ['#86EFAC', '#93C5FD', '#FDE047', '#FCA5A5'] :
      ['#16A34A', '#2563EB', '#CA8A04', '#DC2626']
  })
  const titleColor = computed(() => {
    const isDark = useDark()
    return isDark.value ? '#E5E7EB' : '#1F2937'
  })

  return {bgColor, titleColor}
}