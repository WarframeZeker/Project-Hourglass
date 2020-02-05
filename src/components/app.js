import React, {useState, useEffect} from 'react';
import Start from './pages/start';
import Breaks from './pages/breaks';
import GeneralSelector from './pages/generalSelector';
import SimpleSelector from './pages/simpleSelector';

const App = props => {

  /** Tracking which page is currently active */
  const [pages, setPage] = useState({
    start: true,
    advisors: false, 
    trainees: false, 
    shadows: false, 
    meetings: false,
    schedules: false, 
    schedules2: false, 
    schedules3: false, 
    breaks1: false,
    breaks2: false,
  });

  /** Tracking whether default breaks were toggled to see which page the back button should render */
  const [defaultBreaks, toggleDefaultBreaks] = useState(false);

  /** Tracking status of which step the user is on */
  const [pageStatus, setPageStatus] = useState(0);
  
  /** Selected Roster for a selected shift in both San Francisco and Phoenix  */
  const [selectedRoster, setRoster] = useState([]);

  /** Set adjusted roster based on the selected roster */
  const [adjustedRoster, setAdjustedRoster] = useState({});

  /** Selected shifts all break/lunch times available */
  const [selectBreakLunchTimes, setBreakLunchTimes] = useState([]); 

  /** Selected shifts all times available */
  const [selectShiftTimeSlots, setTimeSlots] = useState([]);

  /** Selected individuals that are working from the selected roster */
  const [advisorsWorking, setDailyRoster] = useState([]);

  /** Selected trainees that are working from the individuals that are working */
  const [traineesWorking, setTraineeRoster] = useState([]);

  /** Selected Shadowers that are working from roster */
  const [shadowersWorking, setShadowerRoster] = useState([]);

  /** Trainee and Shadow Pairs */
  const [traineeShadowPairs, setPairs] = useState([]);

  /** Team meeting status --  default value is set to false (no meeting) */
  const [teamMeeting, setMeeting] = useState(false);

  /** Individuals that need to have their schedules altered */
  const [alterList, setAlterList] = useState([]);

  /** temporary data -- use until google spreadsheet is functional */
  
  const advisorRosters = {
    sfDay: ['Alejandro', 'Ayman', 'Austin', 'Carlos', 'Dulguun', 'Faycal', 'Henry', 'Jesse', 'Jimsson', 'Lori', 'Michael', 'Shannen', 'Steven'],
    sfSwing: ['person_2', 'person_7', 'person_11', 'person_15', 'person_19', 'person_24', 'person_28', 'person_33', 'person_37', 'person_42', 'person_46', ],
    phxDay: ['person_3', 'person_6', 'person_12', 'person_16', 'person_21', 'person_25', 'person_29', 'person_34', 'person_38', 'person_43', 'person_47', ],
    phxGrave: ['person_4', 'person_5', 'person_13', 'person_17', 'person_22', 'person_26', 'person_31', 'person_35', 'person_39', 'person_44', 'person_48',], 
  };

  // const breaksAndLunchTimes = {
  //   break1: ['9:30am - 9:45am', '9:45am - 10:00am', '10:00am, 10:15am'],
  //   break2: ['2:15pm - 2:30pm', '2:30pm - 2:45pm', '2:45pm - 3:00pm'],
  //   weekdayLunch: ['11:30am - 12:00pm', '12:05pm - 12:35pm'],
  //   weekendLunch: ['12:00pm - 12:30pm', '12:30pm - 1:00pm'],
  // };

  const breaksAndLunchTimes = [['9:30am - 9:45am', '9:45am - 10:00am', '10:00am, 10:15am'], ['2:15pm - 2:30pm', '2:30pm - 2:45pm', '2:45pm - 3:00pm'], ['11:30am - 12:00pm', '12:05pm - 12:35pm'], ['12:00pm - 12:30pm', '12:30pm - 1:00pm']];

  const generalTimeSlots = {
    day: ['7:00am - 7:15am', '7:15am - 8:30am', '7:30am - 7:45am', '7:45am - 8:00am', '8:00am - 8:15am', '8:15am - 8:30am', '8:30am - 8:45am', '8:45am - 9:00am', '9:00am - 9:15am', '9:15am - 9:30am', '9:30am - 9:45am', '9:45am - 10:00am', '10:00am - 10:15am', '10:15am - 10:30am', '10:30am - 10:45am', '10:45am - 11:00am', '11:00am - 11:15am', '11:15am - 11:30am', '11:30am - 11:45am', '11:45am - 12:00pm', '12:00pm - 12:15pm', '12:15pm - 12:30pm', '12:30pm - 12:45pm', '12:45pm - 1:00am', '1:00pm - 1:15pm', '1:15pm - 1:30pm', '1:30pm - 1:45pm', '1:45pm - 2:00pm', '2:00pm - 2:15pm', '2:15pm - 2:30pm', '2:30pm - 2:45pm', '2:45pm - 3:00pm', '3:00pm - 3:15pm', '3:15am - 3:30pm', '3:30am - 3:45pm', '3:45am - 4:00pm', '4:00am - 4:15pm', '4:15pm - 4:30pm', '4:30pm - 4:45pm', '4:45pm - 5:00pm', '5:00pm - 5:15pm', '5:15pm - 5:30pm', '5:30pm - 5:45pm', '5:45pm - 6:00pm', ],
    swing: ['3:30pm - 3:45pm', '3:45pm - 4:00pm', '4:00pm - 4:15pm', '4:15pm - 4:30pm', '4:30pm - 4:45pm', '4:45pm - 5:00pm', '5:00pm - 5:15pm', '5:15pm - 5:30pm', '5:30pm - 5:45pm', '5:45pm - 6:00pm', '6:00pm - 6:15pm', '6:15pm - 6:30pm', '6:30pm - 6:45pm', '6:45pm - 7:00pm', '7:00pm - 7:15pm', '7:15pm - 7:30pm', '7:30pm - 7:45pm', '7:45pm - 8:00pm', '8:00pm - 8:15pm', '8:15pm - 8:30pm', '8:30pm - 8:45pm', '8:45pm - 9:00pm', '9:00pm - 9:15pm', '9:15pm - 9:30pm', '9:30pm - 9:45pm', '9:45pm - 10:00pm', '10:00pm - 10:15pm', '10:15pm - 10:30pm', '10:30pm - 10:45pm', '10:45pm - 11:00pm', '11:00pm - 11:15pm', '11:15pm - 11:30pm', '11:30pm - 11:45pm', '11:45pm - 12:00am' ],
    // graveyard: [''], 
  };

  const typesOfMeetings = ['1:1', 'Audits', 'Break 1', 'Break 2', 'Coaching', 'DAS', 'Demo', 'KC', 'Lunch', 'Out', 'Terminal', ];

  /** ************************************************************ */
  
  /** Utility/Action Functions */

  const changeView = (type, direction) => {

    if (direction === 'NEXT') {
      switch(type) {
        case('start'):
          setPage({...pages, start: true});
          setPageStatus(0);
          break;      
        case('advisors'): 
          setPage({...pages, start: false, advisors: true});
          setPageStatus(1);
          break;
        case('trainees'): 
          setPage({...pages, advisors: false, trainees: true}); 
          setPageStatus(2);
          break;
        case('shadows'): 
          setPage({...pages, trainees: false, shadows: true});
          break;
        case('meetings'):
          if (traineesWorking.length > 0) {
            break;
          }

          setPage({...pages, shadows: false, meetings: true}); 
          setPageStatus(3);
          break;
        case('breaks1'): 
          setPage({...pages, meetings: false, breaks1: true});
          setPageStatus(4);
          break;
        case('breaks2'):
          setPage({...pages, breaks1: false, breaks2: true});
          break;
        case('schedule'): 
          setPage({...pages, breaks1: false, breaks2: false, schedules: true});
          setPageStatus(5);
          break;
        case('schedule2'):
          setPage({...pages, schedules: false, schedules2: true}); 
          break;
        case('schedule3'):
          if (alterList.length > 0) {
            /** Remove After everything has been chosen */
            removeAdvisorWithCompletedSch(); 
            break;
          };

          setPage({...pages, schedules2: false, schedules3: true}); 
          break;
        case('completed'): 
          setPage({...pages, schedules3: false,});
          setPageStatus(6);
          break;
      }
    } else {
      switch(type) {
        case('start'):
          setPage({...pages, start: true});
          setPageStatus(0);
          break;      
        case('advisors'): 
          setPage({...pages, start: true, advisors: false});

          /** resets adjusted list */
          setAdjustedRoster({});
          setPageStatus(0);
          break;
        case('trainees'): 
          setPage({...pages, advisors: true, trainees: false}); 
          setPageStatus(1);
          break;
        case('shadows'): 
          setPage({...pages, trainees: true, shadows: false});
         
          /** resets shadow pairs */
          setPairs([]);
          break;
        case('meetings'):
          setPage({...pages, shadows: true, meetings: false}); 
          setPageStatus(2);
          break;
        case('breaks1'): 
          setPage({...pages, meetings: true, breaks1: false});
          setMeeting(false);
          setPageStatus(3);
          break;
        case('breaks2'):
          setPage({...pages, breaks1: true, breaks2: false});
          break;
        case('schedule'): 
          setPage({...pages, breaks1: true, schedules: false});
          setPageStatus(4);

          /** resets meeting flag from true to false if it was altered in any way before */
          setMeeting(false);
          
          /** resets default break option from true to false */
          toggleDefaultBreaks(false);

          break;
        case('schedule2'):
          setPage({...pages, schedules: true, schedules2: false});
          break;
        case('schedule3'):
          setPage({...pages, schedules2: true, schedules3: false}); 
          break;
        case('completed'): 
          if (!defaultBreaks) {
            setPage({...pages, schedules3: true});
            setPageStatus(5); 
            break;
          } else {
            setPage({...pages, schedules: true});
            toggleDefaultBreaks(false);
            setPageStatus(5);
            break;
          }
      }
    }
  };

  /** Select Rosters */
  const selectStaffRoster = (event, location) => {
    if (event.target.id === 'SF Day_large_button') {
      setRoster([...advisorRosters.sfDay]);
      setBreakLunchTimes([...breaksAndLunchTimes]);
      setTimeSlots([...generalTimeSlots.day]);
    } else if (event.target.id === 'SF Swing_large_button') {
      setRoster([...advisorRosters.sfSwing]);
      setBreakLunchTimes([...breaksAndLunchTimes]);
      setTimeSlots([...generalTimeSlots.day]);
    } else if (event.target.id === 'PHX Day_large_button') {
      setRoster([...advisorRosters.phxDay]);
      setBreakLunchTimes([...breaksAndLunchTimes]);
      setTimeSlots([...generalTimeSlots.day]);
    } else {
      setRoster([...advisorRosters.phxGrave]);
      setBreakLunchTimes([...breaksAndLunchTimes]);
      setTimeSlots([...generalTimeSlots.day]);
    }
  };

  /** Manipulates advisor roster, sets keys to advisor names and sets the values to an empty array */
  const manipulateRoster = (roster) => {
    let adjustedRosterObject = {};

    roster.map(advisor => {
      adjustedRosterObject[advisor] = [];
    });

    setAdjustedRoster(adjustedRosterObject);

    return;
  };

  /** Selecting Individuals and add them to the working roster for the day */
  const addIndividualToDailyRoster = (event) => {
    setDailyRoster([...advisorsWorking, event.target.value]);
  };

  /** Selecting Trainees and adding them to a trainee roster for the day */
  const selectTrainees = (event) => {
    setTraineeRoster([...traineesWorking, event.target.value]);
  };

  /** Selecting Shadowers and addingthem to a shadower roster for the day */
  const selectShadowers = (event) => {
    setShadowerRoster([...shadowersWorking, event.target.value]);
  };

  /** Pairing Trainees and Shadowers into a list */
  const setTraineeShadowerPairs = (event) => {
    setPairs([...traineeShadowPairs, [traineesWorking[traineesWorking.length - 1], event.target.value]]);
  };

  /** Remove trainee from the list */
  const removeTraineeFromList = () => {
    traineesWorking.pop();
    setTraineeRoster([...traineesWorking]);
  };

  /** Select advisors that need to have their break schedules altered */
  const advisorsWithAlteredSchedules = (event, advisors) => {
    setAlterList([...alterList, event.target.value]);
  };

  /** Remove advisor that has had their schedule altered */
  const removeAdvisorWithCompletedSch = () => {
    alterList.pop();
    setAlterList([...alterList]);
  };

  /** toggles team meeting */
  const toggleTeamMeeting = (event) => {
    changeView('breaks1', 'NEXT');
    if (event.target.value === 'Yes') {
      setMeeting(true);
    }
  };

  /** toggle between default breaks or altered breaks */
  const chooseBreaks = (event) => {
    if (event.target.value === 'Default') {
      changeView('schedule', 'NEXT');
      toggleDefaultBreaks(true);
    } else {
      changeView('breaks2', 'NEXT');
    }
  };

  /** select type of meeting and add it to a list that is assigned to an advisor */
  const chooseMeetingTypes = (event) => {
    let prevAdvisorList = adjustedRoster;

    prevAdvisorList[alterList[alterList.length - 1]].push([event.target.value]);
    setAdjustedRoster({...prevAdvisorList});

    return;
  };

  useEffect(() => {
    /** populste adjusted roster after the initial roster is selected */
    manipulateRoster(selectedRoster);
  }, [selectedRoster]);

  useEffect(() => {
    console.log('pages: ', pages);
    console.log('adjusted roster: ', adjustedRoster);
  });

  useEffect(() => {
    console.log('trainees : ', alterList)
  }, [ alterList ]);

  useEffect(() => {
    console.log('trainees : ', traineesWorking)
  }, [ traineesWorking ]);

  useEffect(() => {
    console.log('shadow pairs : ', traineeShadowPairs)
  }, [ traineeShadowPairs ]);

  useEffect(() => {
    console.log('meeting : ', teamMeeting)
  }, [ teamMeeting ]);

  return (
    <div id="main_container" class="main_container">
      {pages.start ? 
        <Start 
          pageStatus={pageStatus}
          next={() => changeView('advisors', 'NEXT')}
          selectStaffRoster= {selectStaffRoster}
        />
      : pages.advisors ? 
        <GeneralSelector 
          pageStatus={pageStatus}
          title={'Which advisors are working today?'}
          data={selectedRoster}
          next={() => changeView('trainees', 'NEXT')}
          back={() => changeView('advisors', 'BACK')}
          action={addIndividualToDailyRoster}
        />
      : pages.trainees ? 
        <GeneralSelector 
          pageStatus={pageStatus}
          title={'Who are the trainees working today?'}
          data={advisorsWorking}
          next={() => changeView('shadows', 'NEXT')}
          back={() => changeView('trainees', 'BACK')}
          action={selectTrainees}
        />
      : pages.shadows ? 
        traineesWorking.length > 0 ? 
          <GeneralSelector 
            pageStatus={pageStatus}
            title={`Who will shadow ${traineesWorking[traineesWorking.length - 1]}?`}
            data={advisorsWorking}
            next={() => {
              changeView('meetings', 'NEXT');
              removeTraineeFromList();
            }}
            back={() => changeView('shadows', 'BACK')}
            action={setTraineeShadowerPairs}
          />
        : 
          <GeneralSelector 
            pageStatus={pageStatus}
            title={`All trainees have been paired. Press "Continue" to proceed.`}
            data={[]}
            next={() => changeView('meetings', 'NEXT')}
            back={() => changeView('shadows', 'BACK')}
            action={setTraineeShadowerPairs}
          />
      : pages.meetings ? 
        <SimpleSelector 
          pageStatus={pageStatus}
          title={'Is there a team meeting?'}
          type={['Yes', 'No']}
          next={toggleTeamMeeting} // changeView('breaks1', 'NEXT')
          back={() => changeView('meetings', 'BACK')}
        />
      : pages.breaks1 ? 
        <SimpleSelector 
          pageStatus={pageStatus}
          title={'Default break schedule?'}
          type={['Default', 'Custom']}
          // next={() => changeView('breaks2', 'NEXT')}
          next={chooseBreaks}
          back={() => changeView('breaks1', 'BACK')}
        />
      : pages.breaks2 ?
        <Breaks 
          pageStatus={pageStatus}
          title={''}
          next={() => changeView('schedule', 'NEXT')}
          back={() => changeView('breaks2', 'BACK')}
        />
      : pages.schedules ?
        <GeneralSelector 
          pageStatus={pageStatus}
          title={'Any advisors with fixed schedules?'}
          data={advisorsWorking}
          next={() => changeView('schedule2', 'NEXT')}
          back={() => changeView('schedule', 'BACK')}
          action={advisorsWithAlteredSchedules}
        />
      : pages.schedules2 ?
        alterList.length > 0 ? 
          <GeneralSelector 
            pageStatus={pageStatus}
            title={`What is ${alterList[alterList.length - 1]}'s fixed schedule?`}
            data={typesOfMeetings}
            next={() => changeView('schedule3', 'NEXT')}
            back={() => changeView('schedule2', 'BACK')}
            action={chooseMeetingTypes}
          />
        : 
        // refactor this line and add the appropriate component
        <button onClick={() => changeView('schedule3', 'NEXT')}></button>  
        // <GeneralSelector 
        //   pageStatus={pageStatus}
        //   title={`What is ${alterList[alterList.length - 1]}'s fixed schedule?`}
        //   data={typesOfMeetings}
        //   next={() => changeView('schedule3', 'NEXT')}
        //   back={() => changeView('schedule2', 'BACK')}
        //   action={chooseMeetingTypes}
        // />
      : pages.schedules3 ?
        <GeneralSelector 
          pageStatus={pageStatus}
          title={`What is ${alterList[alterList.length - 1]}'s ${'type_of_meeting'} time?`}
          data={selectShiftTimeSlots} // fill in with data for times of breaks and such 
          next={() => changeView('completed', 'NEXT')}
          back={() => changeView('schedule3', 'BACK')}
        />
      :
        <SimpleSelector 
          pageStatus={pageStatus}
          title={'All Set!!!'}
          type={['Start Over?', 'Exit']}
          next={() => changeView('start', 'NEXT')}
          back={() => changeView('completed', 'BACK')}
        />
      }  
    </div>
  )
};

export default App;