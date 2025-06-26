'use client';
import { Box, Card, Flex, Text, Avatar } from "@radix-ui/themes";
import { useEffect, useState } from 'react';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [openIssuesCount, setOpenIssuesCount] = useState<number>(0);

  useEffect(() => {
    const fetchOpenIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        if (!response.ok) {
          throw new Error('Failed to fetch open issues');
        }
        const data: Issue[] = await response.json();
        console.log(data);
        setOpenIssuesCount(data.length);
      } catch (error) {
        console.error("Error fetching open issues:", error);
      }
    };
    fetchOpenIssues();
  }, []);

  return (
    <div>
      <Box maxWidth="240px">
        <Flex gap="4" justify="start">
          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">Open Tasks</Text>
                <Text as="div" size="2" color="gray">{openIssuesCount}</Text>
              </Box>
            </Flex>
          </Card>
          
          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">In Progress</Text>
                <Text as="div" size="2" color="gray">0</Text>
              </Box>
            </Flex>
          </Card>

          <Card style={{ minWidth: "120px" }}>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">Closed</Text>
                <Text as="div" size="2" color="gray">0</Text>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </div>
  );
}
