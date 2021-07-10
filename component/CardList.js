import { NodeIndexOutlined } from '@ant-design/icons';
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
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      style={{
        backgroundColor: 'white',
        border: 'none',
      }}
      header={<div style={{ border: 0 }}>{header}</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ marginTop: '20px', marginLeft: 10, marginRight: 10 }}
        >
          <Card
            style={{ hight: 200, border: 'none' }}
            cover={
              <img
                alt="example"
                src={item.src}
                style={{
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            }
            actions={[
              <BsFillBookmarkFill
                key="bookmark"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginLeft: 'auto',
                  marginRight: '1em',
                  width: 20,
                  height: 20,
                }}
              />,
            ]}
          >
            <Meta
              title={item.title}
              description={item.description}
              style={{
                wordWrap: 'break-word',
                whiteSpace: 'break-spaces',
                // overflow: 'hidden',
                // fontSize: '16px',
                width: '100%',
                // lineHeight: '1.6em',
                // maxHeight: '6.4em',
                // display: '-webkit-box',
                // textOverflow: 'ellipsis',
                // WebkitLineClamp: '2',
                // WebkitBoxOrient: 'vertical',
                // visibility: 'visible',
              }}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};
export default CardList;
