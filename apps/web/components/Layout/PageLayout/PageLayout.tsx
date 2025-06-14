import { PropsWithChildren } from "react";
import { Box, BoxProps } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import clsx from "clsx";

import { queryClient } from "@/lib/queryClient";

import classes from "./PageLayout.module.css";

interface Props extends BoxProps {
  withoutHydration?: boolean;
}

export function PageLayout({
  children,
  className,
  withoutHydration = false,
  ...props
}: PropsWithChildren<Props>) {
  if (withoutHydration) {
    return (
      <Box className={clsx(classes.container, className)} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box className={clsx(classes.container, className)} {...props}>
        {children}
      </Box>
    </HydrationBoundary>
  );
}
