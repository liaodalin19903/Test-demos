
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

/**
 * 数据库元数据类型
 */
export type NotionDatabase = PageObjectResponse & SpecificProperties


// 定义更明确的 properties 结构
type PageSpecificProperties = {
  properties: {
      desc: {
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

export type NotionDatabasePage = PageObjectResponse & PageSpecificProperties


/**
 * 数据库详情数据类型
 */
export type NotionDatabaseDetail = {
  id: string,  // 需要同NotionDatabase的properties.proj_id
  DataX6: string,
  DataG6Config: string,
  DataNodes: string[]  // 所有nodes的说明信息
}
