import WordCloud from '@/components/WordCloud3d';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Image, Link, List, message, Row, Space } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';

import EditableLinkGroup from './components/EditableLinkGroup';

const ContainerHeight = document.body.scrollHeight - 260;
const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

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
    <Row gutter={24}>
      <Col xl={6} lg={24} md={24} sm={24} xs={24}>
        <Card
          style={{
            marginBottom: 10,
          }}
          title={null}
          bordered={false}
          bodyStyle={{
            padding: 0,
          }}
        >
          <div
            style={{
              height: '300px',
            }}
          >
            <WordCloud />
          </div>
        </Card>
        <Card
          style={{
            marginBottom: 10,
          }}
          title="导航栏"
          bordered={false}
          bodyStyle={{
            padding: 0,
          }}
        >
          <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
        </Card>

        <Card
          style={{
            marginBottom: 10,
          }}
          title="近期文章"
          bordered={false}
          bodyStyle={{
            padding: 0,
          }}
        >
          <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
        </Card>
        <Card
          style={{
            marginBottom: 10,
          }}
          title="浏览排行"
          bordered={false}
          bodyStyle={{
            padding: 0,
          }}
        >
          <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
        </Card>
      </Col>
      <Col xl={18} lg={24} md={24} sm={24} xs={24}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={articleList}
          footer={false}
          loading={loading}
          ref={listHeight}
          rowKey={'id'}
        >
          <VirtualList
            data={articleList}
            // height={window.innerHeight - 230}
            height={2000}
            itemHeight={5}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                  <Image
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                    />
                  }
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.title}
                />
                {item.body}
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
    </Row>
  );
};

export default App;
