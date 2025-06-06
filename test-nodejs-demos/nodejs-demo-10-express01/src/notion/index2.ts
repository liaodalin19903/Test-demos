const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require('fs');
// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
  auth: "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",
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });


export const getBlocks = async (blockId?: string) => {

  const mdblocks = await n2m.pageToMarkdown("17ddeaa8cb4b80929a2cc1617a013cdd");
  const mdString = n2m.toMarkdownString(mdblocks);
  //console.log(mdString.parent);

  //console.log(mdString);

  return mdString.parent;

}