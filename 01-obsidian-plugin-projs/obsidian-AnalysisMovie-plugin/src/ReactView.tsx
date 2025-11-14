// src/ReactView.tsx
import { useApp } from './hooks';
import { getFilmSourceList, FilmItem } from './apis';
import { useState, useEffect, useRef } from 'react';
import { Button, Cascader } from 'antd';
import type { CascaderProps } from 'antd';
import ReactPlayer from 'react-player';
import { TFile } from 'obsidian';
import { TimelineComponent } from './components/Timeline';

interface FilmOption {
  value: string;
  label: string;
  sourcepath: string;
  metapath: string;
}

export const ReactView = () => {
  const app = useApp()!;
  const [filmSourceList, setFilmSourceList] = useState<FilmItem[]>([]);
  const [options, setOptions] = useState<FilmOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [playPath, setPlayPath] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | string>('100%');

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        setWidth(containerRef.current?.offsetWidth || '100%');
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  // 当 filmSourceList 更新时，更新 cascader 选项
  useEffect(() => {
    const newOptions = filmSourceList.map(item => ({
      value: item.name,
      label: item.name,
      sourcepath: item.sourcepath,
      metapath: item.metapath
    }));
    setOptions(newOptions);
  }, [filmSourceList]);

  // 组件加载时自动获取影片列表
  useEffect(() => {
    const fetchFilmList = async () => {
      setLoading(true);
      try {
        const res = await getFilmSourceList(app);
        setFilmSourceList(res);
        console.log(res);
      } catch (error) {
        console.error('获取影片列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmList();
  }, []); // 空依赖数组确保只在组件挂载时执行一次

  const onChange: CascaderProps<FilmOption>['onChange'] = (value, selectedOptions) => {
    console.log('Selected value:', value);
    console.log('Selected options:', selectedOptions);
    
    // 当用户选择影片时，设置播放源
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedFilm = selectedOptions[0];
      setSelectedSource(selectedFilm.sourcepath);

      setPlayPath(app.vault.adapter.getResourcePath(selectedFilm.sourcepath))
    }
  };

  const filter = (inputValue: string, path: FilmOption[]) =>
    path.some(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await getFilmSourceList(app);
      setFilmSourceList(res);
      console.log(res);
    } catch (error) {
      console.error('获取影片列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4>拉片:</h4>
      <span>Vault name：{app.vault.getName()}</span>
      <br />

      <button onClick={handleRefresh} disabled={loading}>
        {loading ? '加载中...' : '刷新列表'}
      </button>
      
      <h4>片源列表:</h4>
      {options.length > 0 ? (
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="请选择影片"
          showSearch={{ filter }}
          onSearch={value => console.log('Searching:', value)}
          style={{ width: '300px' }}
        />
      ) : (
        <p>暂无影片数据</p>
      )}

      <hr />

      {/* 只有当用户选择了影片且文件存在时才显示播放器 */}
      {playPath && (
        <div>
          <h4>影片播放:</h4>
          <ReactPlayer
            src={playPath}
            controls={true}
            width="100%"
            height="400px"
            
          />
        </div>
      )}

      {selectedSource && !playPath && (
        <p>文件不存在或路径错误: {selectedSource}</p>
      )}

      {!selectedSource && (
        <p>请从上面的列表中选择一个影片开始播放</p>
      )}

      {/* react-svg-timeline */}

      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
        <TimelineComponent 
          width={ Number(width) } 
          height={300}
          videoDuration={1 * 3600 + 32 * 60 + 15} // 1小时32分钟15秒
          videoStartTime={0}
        />
      </div>

    </>
  );
};