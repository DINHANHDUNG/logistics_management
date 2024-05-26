import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from 'react-native-calendars';
import {groupBy, find, filter} from 'lodash';
import {getDate} from './timeLineEvents';
import HeaderCustom from '../../components/header';
import {useGetListChuyenXeQuery} from '../../app/services/statusCar';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import moment from 'moment';
import LoadingModal from '../../components/modals/loadingModal';

const convertToEvent = (data: any) => {
  return {
    id: data?.IDChuyen,
    start: data?.NgayDongHangCal,
    end: data?.NgayTraHangCal,
    title: `${data?.BienSoXe}`,
    color: 'lightblue',
    summary: `${data?.DiemDi} -> ${data?.DiemDen}\n ${moment(
      data?.NgayDongHangCal,
    ).format('DD-MM-YYYY')} -> ${moment(data?.NgayTraHangCal).format(
      'DD-MM-YYYY',
    )}`,
  };
};

const StatusCarDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;
  const auth = useAppSelector(authStore);
  const formattedDate = moment().format('YYYY-MM-DD');
  const {data, isLoading} = useGetListChuyenXeQuery(
    {
      IDXe: record.IDXe,
      Productkey: auth.Key,
      dtNow: formattedDate,
      Limit: 100,
      Page: 1,
    },
    {
      skip: !record.IDXe && !auth.Key,
    },
  );

  console.log('data', data);

  const EVENTS = (data?.data?.length > 0 ? data?.data : []).map(convertToEvent);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState<any>(
    groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)),
  );
  const [initTime, setInitTime] = useState({
    hour: 9,
    minutes: 0,
  });

  // const timelineRef = useRef(null);

  // useEffect(() => {
  //   if (timelineRef.current && EVENTS.length > 0) {
  //     // Find the date string of the first event
  //     const firstEventDate = CalendarUtils.getCalendarDateString(
  //       EVENTS[0].start,
  //     );
  //     // Scroll to the first event of the first date
  //     const index = eventsByDate[firstEventDate].findIndex(
  //       event => event.id === EVENTS[0].id,
  //     );
  //     timelineRef.current.scrollToIndex({index, animated: true});
  //   }
  // }, [eventsByDate]);

  useEffect(() => {
    if (data?.data && !isLoading) {
      // Lấy giờ từ sự kiện đầu tiên
      const EVENTS = (data?.data?.length > 0 ? data?.data : []).map(
        convertToEvent,
      );
      const firstEventTime = new Date(EVENTS?.[0]?.start);
      const INITIAL_TIME = {
        hour: firstEventTime.getHours(),
        minutes: firstEventTime.getMinutes(),
      };
      setEventsByDate(
        groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)),
      );
      console.log('INITIAL_TIME', INITIAL_TIME);

      setInitTime(INITIAL_TIME);
    }
  }, [isLoading]);

  const onDateChanged = (date: any, source: any) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent = (timeString: any, timeObject: any) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white',
    } as any;

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

  const approveNewEvent = (_timeString: any, timeObject: any) => {
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
      {!isLoading && (
        <CalendarProvider
          date={currentDate}
          onDateChanged={onDateChanged}
          onMonthChange={onMonthChange}
          showTodayButton
          disabledOpacity={0.6}>
          <TimelineList
            // ref={timelineRef}
            events={eventsByDate}
            timelineProps={timelineProps}
            showNowIndicator
            scrollToFirst
            scrollToNow
            initialTime={initTime}
            // renderItem={item => <Text>{item.date}</Text>}
          />
        </CalendarProvider>
      )}
      <LoadingModal isVisible={isLoading} />
    </View>
  );
};

export default StatusCarDetailScreen;
