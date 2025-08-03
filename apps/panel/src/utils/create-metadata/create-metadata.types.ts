import type { Metadata } from 'next';

export type MetadataCallback = () => Promise<Metadata> | Metadata;
