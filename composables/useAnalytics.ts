import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
} from 'chart.js'

export default function useAnalytics() {
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  const { bgColor, titleColor } = useChartColor()

  const ticketCountByPriorityData = ref({
    labels: ['Baja', 'Media', 'Alta', 'Urgente'],
    datasets: [{
      data: [] as number[],
      backgroundColor: bgColor.value,
    }]
  } satisfies ChartData)
  const ticketCountByPriorityOptions = ref({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        color: titleColor.value,
        text: 'Total Tickets Abiertos',
        font: {
          size: 20,
          weight: 'bold',
        }
      },
    }
  } satisfies ChartOptions)

  const fetchData = async () => {
    const ticketCountByPriority = await $fetch('/api/analytics/ticket-count-by-priority')
    if (ticketCountByPriority.error) {
      useToast({
        title: 'Error al obtener los datos',
        status: 'error',
        type: 1,
        autoclose: true,
        autotimeout: 5000,
      })
    }

    ticketCountByPriorityData.value = {
      labels: ['Baja', 'Media', 'Alta', 'Urgente'],
      datasets: [{
        data: Object.values(ticketCountByPriority.data) as number[],
        backgroundColor: bgColor.value,
      }]
    } satisfies ChartData
  }

  fetchData()

  return {
    ticketCountByPriorityData,
    ticketCountByPriorityOptions
  }
}