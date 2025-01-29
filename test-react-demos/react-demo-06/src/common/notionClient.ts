import { Client } from '@notionhq/client';

const NOTION_TOKEN = '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'

export const client = new Client({
  auth: NOTION_TOKEN,
});

