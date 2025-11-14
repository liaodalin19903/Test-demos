// src/components/Timeline.tsx
import { Timeline } from 'react-svg-timeline';
import * as React from 'react';  

interface TimelineComponentProps {
  width: number | string;
  height?: number;
}

// src/components/timeline.tsx
interface TimelineComponentProps {
  width: number | string;
  height?: number;
  videoDuration?: number; // 视频总时长(秒)
  videoStartTime?: number; // 视频开始时间(秒)，默认为0
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({ 
  width, 
  height = 300,
  videoDuration = 1 * 3600 + 32 * 60 + 15, // 默认1小时32分钟15秒
  videoStartTime = 0 // 默认从0开始
}) => {
  const lanes = [
    {
      laneId: 'lane-mu',
      label: '幕',
    },
    {
      laneId: 'lane-sequence',
      label: '段落',
    },
    {
      laneId: 'lane-scene',
      label: '场景',
    },
    {
      laneId: 'lane-shot',
      label: '镜头',
    },
  ];
  
  const events = [
    {
      eventId: 'event-1',
      tooltip: 'Event 1',
      laneId: 'lane-sequence',
      startTimeMillis: (videoStartTime + 10 * 60) * 1000, // 10分钟
      endTimeMillis: (videoStartTime + 25 * 60 + 30) * 1000, // 25分钟30秒
    },
    {
      eventId: 'event-2',
      tooltip: 'Event 2',
      laneId: 'lane-scene',
      startTimeMillis: (videoStartTime + 45 * 60 + 15) * 1000, // 45分钟15秒
    },
  ];
  
  // 自定义时间格式化函数
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Timeline
      width={Number(width)}
      height={height}
      lanes={lanes}
      events={events}
      dateFormat={formatTime}
    />
  );
};