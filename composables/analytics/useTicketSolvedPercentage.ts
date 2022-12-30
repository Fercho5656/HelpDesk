import { ChartData, ChartOptions } from 'chart.js';

export default function useTicketSolvedPercentage() {
  useChart()

  const { bgColor, titleColor } = useChartColor()
  const ticketSolvedPercentageData = ref<ChartData>({
    labels: ['Baja', 'Media', 'Alta', 'Urgente'],
    datasets: [{
      data: [] as number[],
      backgroundColor: bgColor.value
    }]
  } as ChartData)

  const ticketSolvedPercentageOptions = ref<ChartOptions>({
    plugins: {
      title: {
        display: true,
        color: titleColor.value,
        text: 'Porcentaje de Tickets Resueltos',
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  })

  const fetchData = async () => {
    const data = await $fetch('/api/analytics/tickets-solved-by-priority')
    if (data.error) {
      useToast({
        title: 'Error al obtener los datos',
        status: 'error',
        type: 1,
        autoclose: true,
        autotimeout: 5000
      })
    }

    ticketSolvedPercentageData.value = {
      labels: ['Baja', 'Media', 'Alta', 'Urgente'],
      datasets: [{
        data: Object.values(data.data) as number[],
        backgroundColor: bgColor.value
      }]
    } as ChartData
  }

  fetchData()

  return {
    ticketSolvedPercentageData,
    ticketSolvedPercentageOptions
  }
}