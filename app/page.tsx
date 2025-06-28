'use client';
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [issuesCount, setIssuesCount] = useState({
    open: 0,
    inProgress: 0,
    closed: 0
  });
  
  // Chart data based on current task status counts
  const [chartData, setChartData] = useState({
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        label: 'Number of Tasks',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  });
  
  // Update chart data when issuesCount changes
  useEffect(() => {
    setChartData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [issuesCount.open, issuesCount.inProgress, issuesCount.closed]
        },
      ],
    }));
  }, [issuesCount]);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Current Task Status Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          precision: 0
        },
        title: {
          display: true,
          text: 'Number of Tasks'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Task Status'
        }
      }
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }
        const data: Issue[] = await response.json();
        
        setIssuesCount({
          open: data.filter(issue => issue.status === 'OPEN').length,
          inProgress: data.filter(issue => issue.status === 'IN_PROGRESS').length,
          closed: data.filter(issue => issue.status === 'CLOSED').length
        });
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <Box maxWidth="240px">
        <Flex gap="4" justify="start">
          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">Open Tasks</Text>
                <Text as="div" size="2" color="gray">{issuesCount.open}</Text>
              </Box>
            </Flex>
          </Card>
          
          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">In Progress</Text>
                <Text as="div" size="2" color="gray">{issuesCount.inProgress}</Text>
              </Box>
            </Flex>
          </Card>

          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">Closed</Text>
                <Text as="div" size="2" color="gray">{issuesCount.closed}</Text>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Box>
      
      <Box mt="5" style={{ maxWidth: '700px' }}>
        <Bar options={chartOptions} data={chartData} />
      </Box>
    </div>
  );
}
