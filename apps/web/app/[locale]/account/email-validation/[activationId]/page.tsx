import { fetchEmailValidation } from "@/actions/auth/email-validation/fetchEmailValidation";

interface Props {
  params: Promise<{
    activationId: string;
  }>;
}

export default async function AccountActivationPage({ params }: Props) {
  const { activationId } = await params;

  const validation = await fetchEmailValidation(activationId);

  return null;
}
