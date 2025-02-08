export const getBlocks = async (blockId?: string) => {
  const { Client } = await import('@notionhq/client');
  const { NotionCompatAPI } = await import('notion-compat');

  const token = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222';
  const notion = new NotionCompatAPI(new Client({ auth: token }));
  const pageId = '17ddeaa8cb4b80929a2cc1617a013cdd';
  return notion.getPage(pageId);
};