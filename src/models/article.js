import { useCallback, useState } from 'react';

import { fetchArticle } from '@/services/article';

export default function useAuthModel() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getArticle = useCallback(async (parmas = {}) => {
    setLoading(true);
    let res = await fetchArticle(parmas);

    let data = [];
    res?.results?.msg?.map((item, index) => {
      data.push({
        href: 'https://ant.design',
        title: `ant design part ${index}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: item?.title,
        content: item?.body,
      });
    });

    setData((list) => [...list, ...res?.results?.msg]);
    setTotal(res?.count ?? 0);
    setLoading(false);
  }, []);

  return {
    loading,
    data,
    total,
    getArticle,
  };
}
