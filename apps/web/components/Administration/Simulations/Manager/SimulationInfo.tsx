"use client";

import { useEffect, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Modal,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCancel, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { SIMULATION_STATUS } from "database";

import { updateSimulation } from "@/actions/administration/updateSimulation";
import { Loader } from "@/components/Loader/Loader";
import { useSimulation } from "@/hooks/administration/useSimulation";
import { dateFormat } from "@/utils/dateFormat";

import classes from "./SimulationInfo.module.css";

interface Props {
  simulationId: string;
  refetchAll(): void;
}

export function SimulationInfo({ refetchAll, simulationId }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, refetch } = useSimulation(simulationId);
  const [newStatus, setNewStatus] = useState<SIMULATION_STATUS>();

  useEffect(() => {
    if (opened) {
      refetch().then((updatedData) => {
        if (
          updatedData &&
          updatedData.data &&
          typeof updatedData.data !== "string"
        ) {
          setNewStatus(updatedData.data.status);
        }
      });
    }
  }, [opened, refetch]);

  const onUpdate = async () => {
    const response = await updateSimulation(simulationId, {
      status: newStatus,
    });

    if (response === "success") {
      notifications.show({
        message: "Simulation status updated",
        color: "green",
      });
      refetchAll();
      close();
    } else {
      notifications.show({
        message: "Failed to update simulation",
        color: "red",
      });
    }
  };

  const TextPair = ({
    label,
    value,
  }: {
    label: string;
    value?: string | null;
  }) => (
    <Box>
      <Text fw={700}>{label}</Text>
      <Text>{value}</Text>
    </Box>
  );

  return (
    <>
      <Modal
        centered
        classNames={{
          title: classes.modalTitle,
        }}
        onClose={close}
        opened={opened}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="md"
        title="Simulation Info"
      >
        <Box className={classes.container}>
          {isLoading || typeof data === "string" ? (
            <Loader />
          ) : (
            <>
              <TextPair label="Macromolecule" value={data?.moleculeName} />
              <Box className={classes.row_container}>
                <TextPair
                  label="Ligand ITP"
                  value={data?.ligandITPName || "No Ligand ITP"}
                />
                <TextPair
                  label="Ligand PDB"
                  value={data?.ligandPDBName || "No Ligand ITP"}
                />
              </Box>
              <TextPair label="Current status" value={data?.status} />
              <Box className={classes.row_container}>
                <TextPair
                  label="Started at"
                  value={
                    data?.startedAt ? dateFormat(data.startedAt) : "Not started"
                  }
                />
                <TextPair
                  label="Ended at"
                  value={data?.endedAt ? dateFormat(data.endedAt) : "Not ended"}
                />
              </Box>
              <TextPair
                label="Created at"
                value={
                  data?.createdAt
                    ? dateFormat(data.createdAt)
                    : "No creation date"
                }
              />

              <Divider />
              <Title component="h2" order={5}>
                Alter status
              </Title>
              <Select
                data={
                  [
                    "COMPLETED",
                    "RUNNING",
                    "QUEUED",
                    "CANCELED",
                    "GENERATED",
                  ] as SIMULATION_STATUS[]
                }
                onChange={(e) => setNewStatus(e as SIMULATION_STATUS)}
                value={newStatus}
              />
              <Box className={classes.row_container}>
                <Button
                  color="gray"
                  leftSection={<IconCancel />}
                  onClick={close}
                  type="button"
                  variant="light"
                >
                  Cancel
                </Button>
                <Button
                  color="green"
                  leftSection={<IconCheck />}
                  onClick={onUpdate}
                >
                  Confirm
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <ActionIcon
        color="cyan"
        variant="light"
        size="lg"
        title="Info"
        onClick={open}
      >
        <IconInfoCircle />
      </ActionIcon>
    </>
  );
}
