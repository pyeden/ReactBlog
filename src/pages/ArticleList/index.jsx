import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, message, Space } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

const ContainerHeight = document.body.scrollHeight - 260;

const App = () => {
  const [isData, setIsData] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const { articleList, getArticle, total, loading } = useModel('article', (model) => ({
    loading: model.loading,
    articleList: model.data,
    total: model.total,
    getArticle: model.getArticle,
  }));

  useEffect(() => {
    getArticle({
      page: page,
      page_size: pageSize,
    });
  }, [page, pageSize]);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onScroll = (e) => {
    console.log(e.currentTarget.scrollHeight);
    console.log(e.currentTarget.scrollTop);
    console.log(document.body.scrollHeight);
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      if (isData) {
        if (total / pageSize <= page) {
          message.info('没有更多了');
          setIsData(false);
          return;
        }
        setPage((pre) => pre + 1);
      }
    }
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={articleList}
      footer={false}
      loading={loading}
    >
      <VirtualList
        data={articleList}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default App;
