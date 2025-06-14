import { Text, Title } from "@mantine/core";

import { validateUserEmail } from "@/actions/auth/validateUserEmail";
import { LanderLayout } from "@/components/Lander/Layout";

interface Props {
  params: Promise<{
    activationId: string;
  }>;
}

export default async function AccountActivationPage({ params }: Props) {
  const { activationId } = await params;

  const validationStatus = await validateUserEmail(activationId);

  if (!validationStatus) {
    return null;
  }

  return (
    <LanderLayout>
      <Title>User email validation</Title>

      <Text>
        Your email was validated and now you can login to use the available
        services.
      </Text>
    </LanderLayout>
  );
}
