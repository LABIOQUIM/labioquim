import { Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";
import { SimulationsContent } from "@/components/VisualDynamics/Simulations/Content";

export default function Page() {
  return (
    <PageLayout>
      <Title>My Simulations</Title>

      <SimulationsContent />
    </PageLayout>
  );
}
