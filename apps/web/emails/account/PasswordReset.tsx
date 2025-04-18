import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface Props {
  firstName: string | null;
  email: string;
  resetURL: string;
}

export const AccountPasswordResetEmail = ({
  email,
  firstName,
  resetURL,
}: Props) => {
  const previewText = `Your password reset link is here!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px] text-center">
              <svg
                className=""
                width="212"
                height="48"
                viewBox="0 0 212 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="212" height="48" rx="4" fill="black" />
                <path
                  d="M66.1635 32V15.2727H69.7001V29.0842H76.8713V32H66.1635ZM82.5233 32H78.7335L84.508 15.2727H89.0655L94.8318 32H91.0421L86.8521 19.0952H86.7214L82.5233 32ZM82.2864 25.4251H91.2381V28.1857H82.2864V25.4251ZM96.8452 32V15.2727H103.543C104.773 15.2727 105.8 15.4551 106.622 15.82C107.444 16.1848 108.062 16.6912 108.476 17.3391C108.89 17.9817 109.097 18.7222 109.097 19.5607C109.097 20.2141 108.966 20.7886 108.705 21.2841C108.443 21.7741 108.084 22.1771 107.626 22.4929C107.174 22.8033 106.657 23.0238 106.075 23.1545V23.3178C106.712 23.3451 107.308 23.5247 107.863 23.8569C108.424 24.189 108.879 24.6546 109.227 25.2536C109.576 25.8471 109.75 26.5549 109.75 27.3771C109.75 28.2647 109.529 29.0569 109.088 29.7539C108.653 30.4454 108.008 30.9927 107.153 31.3956C106.298 31.7985 105.244 32 103.992 32H96.8452ZM100.382 29.1087H103.265C104.25 29.1087 104.969 28.9208 105.421 28.5451C105.873 28.1639 106.099 27.6576 106.099 27.0259C106.099 26.5631 105.987 26.1547 105.764 25.8008C105.541 25.4469 105.222 25.1692 104.809 24.9677C104.4 24.7662 103.913 24.6655 103.347 24.6655H100.382V29.1087ZM100.382 22.2724H103.004C103.488 22.2724 103.918 22.188 104.294 22.0192C104.675 21.8449 104.975 21.5999 105.192 21.2841C105.416 20.9683 105.527 20.5898 105.527 20.1488C105.527 19.5444 105.312 19.0571 104.882 18.6868C104.457 18.3165 103.853 18.1314 103.069 18.1314H100.382V22.2724ZM115.588 15.2727V32H112.051V15.2727H115.588ZM133.869 23.6364C133.869 25.4605 133.523 27.0123 132.832 28.2919C132.146 29.5715 131.209 30.5489 130.022 31.2241C128.84 31.8938 127.512 32.2287 126.036 32.2287C124.55 32.2287 123.216 31.8911 122.034 31.2159C120.853 30.5407 119.919 29.5633 119.233 28.2837C118.547 27.0041 118.203 25.455 118.203 23.6364C118.203 21.8123 118.547 20.2604 119.233 18.9808C119.919 17.7012 120.853 16.7266 122.034 16.0568C123.216 15.3816 124.55 15.044 126.036 15.044C127.512 15.044 128.84 15.3816 130.022 16.0568C131.209 16.7266 132.146 17.7012 132.832 18.9808C133.523 20.2604 133.869 21.8123 133.869 23.6364ZM130.283 23.6364C130.283 22.4548 130.106 21.4583 129.752 20.647C129.404 19.8357 128.911 19.2204 128.274 18.8011C127.637 18.3819 126.891 18.1722 126.036 18.1722C125.181 18.1722 124.435 18.3819 123.798 18.8011C123.161 19.2204 122.666 19.8357 122.312 20.647C121.963 21.4583 121.789 22.4548 121.789 23.6364C121.789 24.8179 121.963 25.8144 122.312 26.6257C122.666 27.437 123.161 28.0523 123.798 28.4716C124.435 28.8909 125.181 29.1005 126.036 29.1005C126.891 29.1005 127.637 28.8909 128.274 28.4716C128.911 28.0523 129.404 27.437 129.752 26.6257C130.106 25.8144 130.283 24.8179 130.283 23.6364ZM142.802 26.1847H145.808L147.319 28.1286L148.805 29.8601L151.607 33.3722H148.307L146.38 31.0036L145.391 29.5987L142.802 26.1847ZM151.86 23.6364C151.86 25.4605 151.514 27.0123 150.823 28.2919C150.137 29.5715 149.2 30.5489 148.013 31.2241C146.832 31.8938 145.503 32.2287 144.027 32.2287C142.541 32.2287 141.207 31.8911 140.025 31.2159C138.844 30.5407 137.91 29.5633 137.224 28.2837C136.538 27.0041 136.195 25.455 136.195 23.6364C136.195 21.8123 136.538 20.2604 137.224 18.9808C137.91 17.7012 138.844 16.7266 140.025 16.0568C141.207 15.3816 142.541 15.044 144.027 15.044C145.503 15.044 146.832 15.3816 148.013 16.0568C149.2 16.7266 150.137 17.7012 150.823 18.9808C151.514 20.2604 151.86 21.8123 151.86 23.6364ZM148.275 23.6364C148.275 22.4548 148.098 21.4583 147.744 20.647C147.395 19.8357 146.902 19.2204 146.265 18.8011C145.628 18.3819 144.882 18.1722 144.027 18.1722C143.173 18.1722 142.427 18.3819 141.789 18.8011C141.152 19.2204 140.657 19.8357 140.303 20.647C139.955 21.4583 139.78 22.4548 139.78 23.6364C139.78 24.8179 139.955 25.8144 140.303 26.6257C140.657 27.437 141.152 28.0523 141.789 28.4716C142.427 28.8909 143.173 29.1005 144.027 29.1005C144.882 29.1005 145.628 28.8909 146.265 28.4716C146.902 28.0523 147.395 27.437 147.744 26.6257C148.098 25.8144 148.275 24.8179 148.275 23.6364ZM164.812 15.2727H168.349V26.1357C168.349 27.3554 168.057 28.4226 167.475 29.3374C166.897 30.2521 166.089 30.9654 165.049 31.4773C164.009 31.9837 162.797 32.2369 161.414 32.2369C160.026 32.2369 158.811 31.9837 157.771 31.4773C156.731 30.9654 155.923 30.2521 155.346 29.3374C154.769 28.4226 154.48 27.3554 154.48 26.1357V15.2727H158.017V25.8335C158.017 26.4705 158.155 27.0368 158.433 27.5323C158.716 28.0278 159.114 28.4171 159.626 28.7003C160.137 28.9834 160.734 29.125 161.414 29.125C162.1 29.125 162.697 28.9834 163.203 28.7003C163.715 28.4171 164.11 28.0278 164.387 27.5323C164.67 27.0368 164.812 26.4705 164.812 25.8335V15.2727ZM174.795 15.2727V32H171.258V15.2727H174.795ZM177.705 15.2727H182.066L186.673 26.5114H186.869L191.475 15.2727H195.837V32H192.406V21.1126H192.267L187.939 31.9183H185.603L181.274 21.0717H181.135V32H177.705V15.2727Z"
                  fill="white"
                />
                <g clipPath="url(#clip0_1_17)">
                  <path
                    d="M16.1935 10C16.1935 9.46957 16.4111 8.96086 16.7982 8.58579C17.1854 8.21071 17.7105 8 18.2581 8H51.2903C51.8379 8 52.363 8.21071 52.7502 8.58579C53.1373 8.96086 53.3548 9.46957 53.3548 10V30C53.3548 30.5304 53.1373 31.0391 52.7502 31.4142C52.363 31.7893 51.8379 32 51.2903 32H18.2581C17.7105 32 17.1854 31.7893 16.7982 31.4142C16.4111 31.0391 16.1935 30.5304 16.1935 30V10Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.4516 40H45.0968"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.5806 32V40"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40.9677 32V40"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.5806 24V16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34.7742 24V22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40.9677 24V20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34.7742 24V22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_17">
                    <rect
                      width="49.5484"
                      height="48"
                      fill="white"
                      transform="translate(10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              here is you password reset link.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetURL}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={resetURL} className="text-blue-600 no-underline">
                {resetURL}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">
                {firstName} ({email})
              </span>
              . If you were not register for a Visual Dynamics account, you can
              ignore this email. If you are concerned about your account&apos;s
              safety, please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AccountPasswordResetEmail.PreviewProps = {
  email: "john@doe.com",
  firstName: "John",
  resetURL: "https://example.com/validate/",
} as Props;

export default AccountPasswordResetEmail;
