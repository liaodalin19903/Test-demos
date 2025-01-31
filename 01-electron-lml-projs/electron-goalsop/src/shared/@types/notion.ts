
import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

// 定义更明确的 properties 结构
type SpecificProperties = {
  properties: {
      selected: {
          id: string;
          type: "number";
          number: number;
      };
      desc: {
          id: string;
          type: "rich_text";
          rich_text: Array<RichTextItemResponse>;
      };
      proj_id: {
          id: string;
          type: "rich_text";
          rich_text: Array<RichTextItemResponse>;
      };
      Name: {
          id: string;
          type: "title";
          title: Array<RichTextItemResponse>;
      };
  };
};


export type NotionDatabase = PageObjectResponse & SpecificProperties
