import { AspectRatio, Box, Card, CardSection, Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

const simulationVideos = [
  {
    title: "APO Simulation",
    url: "https://drive.google.com/file/d/1BbpmeqJXhPR9uqJOa_RXZy9j77-s0XA1/preview",
  },
  {
    title: "ACPYPE Simulation Preparation",
    url: "https://drive.google.com/file/d/1UoIQWeyCRnQDmQh7UKXpa5qgFBAEeja8/preview",
  },
  {
    title: "ACPYPE simulation",
    url: "https://drive.google.com/file/d/16CF3iHisYdq4aHA6RCAAsO0NFF_F6lpF/preview",
  },
  {
    title: "Download Simulation Generated Contents",
    url: "https://drive.google.com/file/d/1wwwKYAScCA6b6XbIkz84-XZEIiqK91XD/preview",
  },
];

export default function GuidesPage() {
  return (
    <PageLayout>
      <Title order={1}>Guides</Title>

      <Title order={2}>Visual Dynamics</Title>
      <Box className={classes.videosContainer}>
        {simulationVideos.map((video) => (
          <Card key={video.url}>
            <CardSection>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={video.url}
                  title={video.title}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </CardSection>
            <Title order={3}>{video.title}</Title>
          </Card>
        ))}
      </Box>
    </PageLayout>
  );
}
