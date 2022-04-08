import React, { useState } from 'react';
import Button from '../../shared/Button';
import DropDown from '../../shared/DropDown';
import Input from '../../shared/Input';

type TimeType = 'LOCALE' | 'ISO' | 'UTC';

function timeSelect(current: number, type: 'LOCALE' | 'ISO' | 'UTC') {
  switch (type) {
    case 'LOCALE':
      return new Date(current).toLocaleString();
    case 'ISO':
      return new Date(current).toISOString();
    case 'UTC':
      return new Date(current).toISOString();
    default:
      return new Date(current).toLocaleString();
  }
}

const formatTime = [
  {
    label: 'Locale',
  },
  {
    label: 'ISO',
  },
  {
    label: 'UTC',
  },
];

const TimeConverter = () => {
  const [current, setCurrent] = useState<number>(Date.now());
  const [timeFormat, setTimeFormat] = useState<TimeType>('LOCALE');
  const [timeString, setTimeString] = useState<string>(
    new Date(current).toLocaleString()
  );

  return (
    <>
      <div className="grid grid-flow-col justify-center align-middle grid-cols-2 grid-rows-2 gap-x-6 gap-y-2 items-center">
        <Button
          onClick={() => {
            setCurrent(Date.now());
            setTimeString(timeSelect(current, timeFormat));
          }}
          className="w-fit"
        >
          Now
        </Button>
        <Input
          value={current}
          type="number"
          onChange={(e) => {
            setCurrent(e.target.valueAsNumber);
          }}
        />
        <DropDown
          className="w-fit"
          onChange={(e) => {
            setTimeString(
              timeSelect(current, e.target.value.toUpperCase() as TimeType)
            );
            setTimeFormat(e.target.value.toUpperCase() as TimeType);
          }}
        >
          {formatTime.map((item) => {
            return (
              <DropDown.Item
                key={item.label}
                className="text-black"
                value={item.label}
              >
                {item.label}
              </DropDown.Item>
            );
          })}
        </DropDown>
        <p>{timeString}</p>
      </div>
    </>
  );
};

export default TimeConverter;
