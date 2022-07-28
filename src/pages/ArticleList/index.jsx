import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, message, Space } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';

const ContainerHeight = document.body.scrollHeight - 260;

const App = () => {
  const [isData, setIsData] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [height, setHeight] = useState(window.innerHeight);
  const listHeight = useRef();

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
    let clientHeight = e.currentTarget.clientHeight; //可视区域高度
    let scrollTop = e.currentTarget.scrollTop; //滚动条滚动高度
    let scrollHeight = e.currentTarget.scrollHeight; //滚动内容高度
    console.log(clientHeight, scrollTop, scrollHeight);
    if (clientHeight + scrollTop === scrollHeight) {
      console.log(111);
      if (isData) {
        if (total / pageSize <= page) {
          message.info('没有更多了');
          setIsData(false);
          return;
        }
        setHeight(e.currentTarget.scrollHeight);
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
      ref={listHeight}
    >
      <VirtualList
        data={articleList}
        height={window.innerHeight - 230}
        itemHeight={5}
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
