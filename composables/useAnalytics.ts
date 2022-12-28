import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions
} from 'chart.js'

export default async function useAnalytics() {
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const ticketCountByPriority = await $fetch('/api/analytics/ticket-count-by-priority')
  const bgColor = usePriorityColor()
  const ticketCountByPriorityData = computed(() => {
    return {
      labels: ['Baja', 'Media', 'Alta', 'Urgente'],
      datasets: [{
        data: Object.values(ticketCountByPriority.data) as number[],
        backgroundColor: bgColor.value,
      }]
    } satisfies ChartData
  })

  const ticketCountByPriorityOptions = computed(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Conteo de tickets por prioridad',
          font: {
            size: 20,
            weight: 'bold',
          }
        }
      }
    } satisfies ChartOptions
  })

  return {
    ticketCountByPriorityData,
    ticketCountByPriorityOptions
  }
}