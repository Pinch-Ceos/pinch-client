import { List, Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import React from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs';

const CardList = ({ data, header }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      header={<div>{header}</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card
            style={{ hight: 300 }}
            cover={<img alt="example" src={item.src} style={{ height: 200 }} />}
            actions={[<BsFillBookmarkFill key="bookmark" />]}
          >
            <Meta title="Card title" description={item.description} />
          </Card>
        </List.Item>
      )}
    />
  );
};
export default CardList;
