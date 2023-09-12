const createLogger = <T extends string>(errorLabels: T[] = []) => {
  const Label = errorLabels.reduce((acc, label) => {
    acc[label] = label;
    return acc;
  }, {} as Record<T, T>);
  const Level = {
    INFO: 1,
    DEBUG: 2,
    WARN: 3,
    ERROR: 4,
    CRITICAL: 5,
  } as const;

  type LogLabel = keyof typeof Label;
  type LogLevel = (typeof Level)[keyof typeof Level];

  const logMessage = (logFn: (msg: string) => void, defaultLevel: LogLevel) => {
    return (
      label: LogLabel,
      details: unknown,
      level: LogLevel = defaultLevel
    ) => {
      logFn(JSON.stringify({ level, label, details: String(details) }));
    };
  };

  return {
    error: logMessage(console.error, Level.ERROR),
    warn: logMessage(console.warn, Level.WARN),
    info: logMessage(console.info, Level.INFO),
    Label,
    Level,
  };
};

export default createLogger;
