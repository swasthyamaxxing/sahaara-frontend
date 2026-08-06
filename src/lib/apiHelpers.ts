export const extractApiData = <T>(payload: unknown): T[] => {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as T[];
    }

    if (record.data && typeof record.data === 'object') {
      const nested = record.data as Record<string, unknown>;

      if (Array.isArray(nested.data)) {
        return nested.data as T[];
      }

      const values = Object.values(nested).flatMap((value) =>
        Array.isArray(value) ? value : [],
      );

      if (values.length > 0) {
        return values as T[];
      }
    }
  }

  return [];
};

export const extractApiItem = <T>(payload: unknown): T | null => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (record.data && typeof record.data === 'object' && !Array.isArray(record.data)) {
    return record.data as T;
  }

  return payload as T;
};

export const formatDisplayDate = (value?: string | null): string => {
  if (!value) {
    return 'Date unavailable';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const parsePatientIdParam = (id: string | string[] | undefined): string | null => {
  if (!id) {
    return null;
  }

  const rawId = Array.isArray(id) ? id[0] : id;
  return rawId || null;
};
