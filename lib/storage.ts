import { put, list, del } from '@vercel/blob';

interface VisitorData {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  purpose: string;
  citizenship: string;
  ndaAgreed: boolean;
  citizenshipDeclaration: boolean;
  signature: string;
}

const PREFIX = 'visitors/';

export async function addVisitor(data: VisitorData): Promise<{ success: boolean; error?: string }> {
  try {
    const safeTimestamp = (data.timestamp || new Date().toISOString()).replace(/[^0-9T-Za-z-]/g, '-');
    const random = Math.random().toString(36).slice(2, 10);
    const pathname = `${PREFIX}${safeTimestamp}-${random}.json`;

    await put(pathname, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving visitor data:', error);
    return { success: false, error: 'Failed to save visitor data' };
  }
}

export async function getVisitors(): Promise<VisitorData[]> {
  try {
    const visitors: VisitorData[] = [];
    let cursor: string | undefined;

    do {
      const result = await list({ prefix: PREFIX, limit: 1000, cursor });
      const fetched = await Promise.all(
        result.blobs.map(async (blob) => {
          const response = await fetch(blob.url);
          const text = await response.text();
          try {
            return JSON.parse(text) as VisitorData;
          } catch {
            return null;
          }
        })
      );
      for (const v of fetched) {
        if (v) visitors.push(v);
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    // Sort newest first by timestamp
    visitors.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    return visitors;
  } catch (error) {
    console.error('Error reading visitor data:', error);
    return [];
  }
}

export async function clearVisitors(): Promise<{ success: boolean; error?: string }> {
  try {
    let cursor: string | undefined;
    do {
      const result = await list({ prefix: PREFIX, limit: 1000, cursor });
      if (result.blobs.length > 0) {
        await del(result.blobs.map((blob) => blob.url));
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    return { success: true };
  } catch (error) {
    console.error('Error clearing visitor data:', error);
    return { success: false, error: 'Failed to clear visitor data' };
  }
}
