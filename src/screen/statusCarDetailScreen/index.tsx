import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from 'react-native-calendars';
import {groupBy, find, filter} from 'lodash';
import {getDate, timelineEvents} from './timeLineEvents';
import HeaderCustom from '../../components/header';

const INITIAL_TIME = {hour: 9, minutes: 0};
const EVENTS = timelineEvents;

const StatusCarDetailScreen = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)),
  );

  const marked = {
    [`${getDate(-1)}`]: {marked: true},
    [`${getDate()}`]: {marked: true},
    [`${getDate(1)}`]: {marked: true},
    [`${getDate(2)}`]: {marked: true},
    [`${getDate(4)}`]: {marked: true},
  };

  const onDateChanged = (date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month, updateSource) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent = (timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white',
    };

    if (timeObject.date) {
      setEventsByDate(prevEventsByDate => {
        const newEventsByDate = {...prevEventsByDate};
        if (newEventsByDate[timeObject.date]) {
          newEventsByDate[timeObject.date] = [
            ...newEventsByDate[timeObject.date],
            newEvent,
          ];
        } else {
          newEventsByDate[timeObject.date] = [newEvent];
        }
        return newEventsByDate;
      });
    }
  };

  const approveNewEvent = (_timeString, timeObject) => {
    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          if (timeObject.date) {
            setEventsByDate(prevEventsByDate => {
              const newEventsByDate = {...prevEventsByDate};
              newEventsByDate[timeObject.date] = filter(
                newEventsByDate[timeObject.date],
                e => e.id !== 'draft',
              );
              return newEventsByDate;
            });
          }
        },
      },
      {
        text: 'Create',
        onPress: eventTitle => {
          if (timeObject.date) {
            setEventsByDate(prevEventsByDate => {
              const newEventsByDate = {...prevEventsByDate};
              const draftEvent = find(newEventsByDate[timeObject.date], {
                id: 'draft',
              });
              if (draftEvent) {
                draftEvent.id = undefined;
                draftEvent.title = eventTitle ?? 'New Event';
                draftEvent.color = 'lightgreen';
                newEventsByDate[timeObject.date] = [
                  ...newEventsByDate[timeObject.date],
                ];
              }
              return newEventsByDate;
            });
          }
        },
      },
    ]);
  };

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24},
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom title={'Thông tin các chuyến'} />
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}>
        {/* <ExpandableCalendar
        firstDay={1}
        leftArrowImageSource={require('../../assets/images/previous.png')}
        rightArrowImageSource={require('../../assets/images/next.png')}
        markedDates={marked}
      /> */}
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
      </CalendarProvider>
    </View>
  );
};

export default StatusCarDetailScreen;
