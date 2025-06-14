import { Title } from "@mantine/core";

import { PasswordResetForm } from "@/components/Auth/PasswordReset/PasswordResetForm";
import { LanderLayout } from "@/components/Lander/Layout";

interface Props {
  params: Promise<{
    resetId: string;
  }>;
}

export default async function AccountActivationPage({ params }: Props) {
  const { resetId } = await params;

  if (!resetId) {
    return null;
  }

  return (
    <LanderLayout>
      <Title>Password Reset</Title>

      <PasswordResetForm resetId={resetId} />
    </LanderLayout>
  );
}
