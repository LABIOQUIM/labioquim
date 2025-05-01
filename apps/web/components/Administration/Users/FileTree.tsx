"use client";

import { Group, Tree } from "@mantine/core";
import { IconFile, IconFolder, IconFolderOpen } from "@tabler/icons-react";

import { downloadUserFile } from "@/actions/administration/downloadUserFile";
import { useUserFileTree } from "@/hooks/administration/useUserFileTree";

interface Props {
  userName: string;
}

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ isFolder, expanded }: FileIconProps) {
  if (isFolder) {
    return expanded ? (
      <IconFolderOpen
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    ) : (
      <IconFolder
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    );
  }

  return <IconFile size={14} stroke={2.5} />;
}

export function AdministrationUserFileTree({ userName }: Props) {
  const { data } = useUserFileTree(userName);

  if (!data || data === "unauthenticated" || data === "unauthorized") {
    return null;
  }

  const doDownloadFile = async (path: string) => {
    const data = await downloadUserFile(path);

    const link = document.createElement("a");
    link.download = `${userName}-${
      path.split("/")[path.split("/").length - 1]
    }`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <Tree
      data={data}
      expandOnClick={false}
      levelOffset={16}
      renderNode={({ node, expanded, hasChildren, elementProps, tree }) => (
        <Group
          gap={5}
          {...elementProps}
          onClick={() =>
            hasChildren
              ? tree.toggleExpanded(node.value)
              : doDownloadFile(node.value)
          }
        >
          <FileIcon
            name={node.value}
            isFolder={hasChildren}
            expanded={expanded}
          />
          <span>{node.label}</span>
        </Group>
      )}
    />
  );
}
