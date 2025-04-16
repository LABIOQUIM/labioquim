"use server";
import { Prisma, prisma, USER_ROLE, USER_STATUS } from "database";
import {
  type MRT_ColumnFiltersState as MRTColumnFiltersState,
  type MRT_PaginationState as MRTPaginationState,
  type MRT_SortingState as MRTSortingState,
} from "mantine-react-table";

import { validateAuth } from "../auth/validateAuth";

// Define the input structure more accurately using a discriminated union
type FilterInput =
  | { id: "createdAt"; value: [string, string] | readonly [string, string] }
  | { id: "role"; value: USER_ROLE } // <-- Use the Enum type
  | { id: "status"; value: USER_STATUS } // <-- Use the Enum type
  | { id: "email"; value: string }
  | { id: "userName"; value: string };

/**
 * Parses a predefined set of filter objects into a Prisma `where` clause for YourModel.
 * Assumes filters array only contains objects with ids: 'createdAt', 'role', 'status', 'email', 'userName'.
 *
 * @param {FilterInput[]} filters - An array of filter objects matching the defined structure.
 * @returns {Prisma.YourModelWhereInput} A Prisma compatible `where` object for YourModel.
 */
function parseFilters(filters: FilterInput[]): Prisma.UserWhereInput {
  if (!Array.isArray(filters)) {
    console.error("Input must be an array of filter objects.");
    return {};
  }

  // Initialize the accumulator with the correct Prisma WhereInput type
  const prismaWhere = filters.reduce((acc, filter) => {
    // No need for basic structure validation if we trust the FilterInput type

    const { id, value } = filter;

    // --- Handle ONLY the Known Filter IDs ---

    switch (id) {
      case "createdAt":
        // Type guard ensures value is [string, string] here
        try {
          const startDate = new Date(value[0]);
          const endDate = new Date(value[1]);

          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.warn(
              `Invalid date format in 'createdAt' filter: ${JSON.stringify(
                value
              )}. Skipping.`
            );
            return acc; // Skip this filter
          }

          // Adjust endDate to the end of the day (UTC)
          endDate.setUTCHours(23, 59, 59, 999);

          // Assign to accumulator
          acc.createdAt = {
            gte: startDate,
            lte: endDate,
          };
        } catch (e) {
          console.warn(
            `Error processing date in 'createdAt' filter: ${e}. Skipping.`
          );
        }
        break; // Important: exit switch case

      case "email":
      case "userName":
        // Type guard ensures value is string here
        if (typeof value === "string" && value.trim() !== "") {
          // Use case-insensitive contains for better search UX
          acc[id] = {
            // TS knows id is 'email' or 'userName' here
            contains: value,
            mode: "insensitive",
          };
        } else {
          // Handle empty string case if needed, e.g., skip or perform exact match
          console.warn(`Empty value provided for '${id}'. Skipping filter.`);
        }
        break; // Important: exit switch case

      case "role":
        // <<< CHANGE HERE >>>
        // value is USER_ROLE here due to the FilterInput type definition
        acc.role = value; // <-- Use direct property access: acc.role
        // No assertion needed if FilterInput is correct
        break;

      case "status":
        // <<< CHANGE HERE >>>
        // value is USER_STATUS here due to the FilterInput type definition
        acc.status = value; // <-- Use direct property access: acc.status
        // No assertion needed if FilterInput is correct
        break;

      // No default case needed as we assume only known IDs are present
    }

    return acc; // Return the updated accumulator
  }, {} as Prisma.UserWhereInput); // Assert initial empty object type

  return prismaWhere;
}

export async function getUsers(
  columnFilters: MRTColumnFiltersState,
  sorting: MRTSortingState,
  pagination: MRTPaginationState
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  const where = parseFilters(columnFilters as FilterInput[]);

  const findArgs: Prisma.UserFindManyArgs = {
    where,
    orderBy: {
      [sorting[0].id]: sorting[0].desc ? "desc" : "asc",
    },
    take: pagination.pageSize,
    skip: pagination.pageIndex * pagination.pageSize,
  };

  const countArgs: Prisma.UserCountArgs = {
    where,
  };

  const users = await prisma.$transaction([
    prisma.user.count(countArgs),
    prisma.user.findMany(findArgs),
  ]);

  return users;
}
