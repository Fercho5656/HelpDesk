import { ChartData, ChartOptions } from 'chart.js'

export default function useTicketCount() {
  useChart()
  const { bgColor, titleColor } = useChartColor()

  const ticketCountByPriorityData = ref<ChartData>({
    labels: ['Baja', 'Media', 'Alta', 'Urgente'],
    datasets: [{
      data: [] as number[],
      backgroundColor: bgColor.value,
    }]
  } as ChartData)

  const ticketCountByPriorityOptions = ref<ChartOptions>({
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
  } as ChartOptions)

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
    } as ChartData
  }

  fetchData()

  return {
    ticketCountByPriorityData,
    ticketCountByPriorityOptions
  }
}