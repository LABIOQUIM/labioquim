import { Title } from "@mantine/core";

import { PasswordResetForm } from "@/components/Auth/PasswordReset/PasswordResetForm";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

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
    <PageLayout>
      <Title>Password Reset</Title>

      <PasswordResetForm resetId={resetId} />
    </PageLayout>
  );
}
