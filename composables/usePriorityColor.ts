export default function usePriorityColor() {
  const colors = computed(() => {
    const isDark = useDark()
    return isDark.value ?
      ['#86EFAC', '#93C5FD', '#FDE047', '#FCA5A5'] :
      ['#16A34A', '#2563EB', '#CA8A04', '#DC2626']
  })

  return colors
}