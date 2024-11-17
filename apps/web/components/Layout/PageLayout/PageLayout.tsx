import { PropsWithChildren } from "react";
import { Box, BoxProps } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import clsx from "clsx";

import { queryClient } from "@/lib/queryClient";

import classes from "./PageLayout.module.css";

export function PageLayout({
  children,
  className,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box className={clsx(classes.container, className)} {...props}>
        {children}
      </Box>
    </HydrationBoundary>
  );
}
