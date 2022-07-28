import { useCallback, useState } from 'react';

import { fetchArticle } from '@/services/article';

export default function useAuthModel() {
  const [data, setData] = useState([]);

  const getArticle = useCallback(async (parmas = {}) => {
    let res = await fetchArticle(parmas);

    let data = [];
    res.map((item, index) => {
      data.push({
        href: 'https://ant.design',
        title: `ant design part ${index}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: item?.title,
        content: item?.body,
      });
    });

    setData((list) => [list, ...res]);
  }, []);

  return {
    data,
    getArticle,
  };
}
