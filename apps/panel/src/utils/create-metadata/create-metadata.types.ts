import type { Metadata } from 'next';

export type MetadataCallback = (t: (t: string) => string) => Metadata;
