import { Client } from '@notionhq/client';
import {
  NOTION_TOKEN
} from '@shared/constants'

export const notionInstance = new Client({
  auth: NOTION_TOKEN,
});
