interface SystemInformation {
  cpu: {
    brand: string;
    vendor: string;
    cores: number;
    physicalCores: number;
  };
  load: {
    current: number;
    average: number;
  };
  mem: {
    total: number;
    used: number;
  };
  fs: {
    size: number;
    used: number;
    available: number;
  };
}
