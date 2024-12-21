import { Fragment } from "react";

import { AdminSimulationQueueInfo } from "../Simulations/QueueInfo";
import { AdminSimulationSystemInfo } from "../Simulations/SystemInfo";

export default function Status() {
  return (
    <Fragment>
      <AdminSimulationQueueInfo />
      <AdminSimulationSystemInfo />
    </Fragment>
  );
}
