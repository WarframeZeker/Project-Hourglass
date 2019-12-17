/**
* @function populateUserBreaks
* @param {Array} totalAttendance - List of all advisors currently present at work
* @param {String} type - break1, break2, or lunch
* @param {Array} shadowList - List of shadowers for a specific shift/day
* @param {Array} traineeList - List of trainees for a specific shift/day
* @return {Object} - object with keys (time slots) and values (list of names) -- subject to change based on the needs of the project
*/

const populateUserBreaks = (totalAttendance, typeOfBreak, shadowList, traineeList) => {
  let times;
  let scheduledTimes = {};
  let shadowPairs = {};
  let counter = 0;
 
  // assign shadower and trainee pairs to a hashtable
  if (shadowList.length !== traineeList.length) {
      console.error('Please ensure every trainee has a shadower.');
  } else {
      for (let i = 0; i < shadowList.length; i++) {
          if (!shadowPairs[shadowList[i]]) {
              // if shadower doesn't exist, create it and assign a trainee
              shadowPairs[shadowList[i]] = [traineeList[i]];
          } else {
              // if shadower is a key, add to the list
              shadowPairs[shadowList[i]] = [...shadowPairs[shadowList[i]], traineeList[i]];  
          }
      }
  }

  switch(typeOfBreak) {
      case('break_1'):
          times = ['9:30', '9:45', '10:00'];
          scheduledTimes['9:30'] = [];
          scheduledTimes['9:45'] = [];
          scheduledTimes['10:00'] = [];
         
          //assign shadowers and trainees to different time slots
          for (let shadower in shadowPairs) {
              for (let j = 0; j < 1; j++) {
                  if (counter === 0) {
                      scheduledTimes[times[0]].push(shadower);
                      scheduledTimes[times[0]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[0]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter ++;
                  } else if (counter === 1) {
                      scheduledTimes[times[1]].push(shadower);
                      scheduledTimes[times[1]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[1]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter ++;
                  } else {
                      scheduledTimes[times[2]].push(shadower);
                      scheduledTimes[times[2]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[2]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter = 0;
                  }
              }
          }

          // assign remaining names to fill in voids in the schedule even it out as best as possible
          totalAttendance.forEach(person => {
              if (scheduledTimes[times[1]].length > scheduledTimes[times[0]].length && scheduledTimes[times[2]].length > scheduledTimes[times[0]].length) {
                  scheduledTimes[times[0]].push(person);
              } else if (scheduledTimes[times[2]].length > scheduledTimes[times[1]].length && scheduledTimes[times[0]].length > scheduledTimes[times[1]].length) {
                  scheduledTimes[times[1]].push(person);
              } else if (scheduledTimes[times[1]].length > scheduledTimes[times[2]].length && scheduledTimes[times[0]].length > scheduledTimes[times[2]].length) {
                  scheduledTimes[times[2]].push(person);  
              } else {
                  scheduledTimes[times[0]].push(person);
              }
          });

          break;
      case('break_2'):
          times = ['2:15', '2:30', '2:45'];
          scheduledTimes['2:15'] = [];
          scheduledTimes['2:30'] = [];
          scheduledTimes['2:45'] = [];

          for (let shadower in shadowPairs) {
              for (let j = 0; j < 1; j++) {
                  if (counter === 0) {
                      scheduledTimes[times[0]].push(shadower);
                      scheduledTimes[times[0]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[0]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter ++;
                  } else if (counter === 1) {
                      scheduledTimes[times[1]].push(shadower);
                      scheduledTimes[times[1]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[1]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter ++;
                  } else {
                      scheduledTimes[times[2]].push(shadower);
                      scheduledTimes[times[2]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[2]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      counter = 0;
                  }
              }
          }

          totalAttendance.forEach(person => {
              if (scheduledTimes[times[1]].length > scheduledTimes[times[0]].length || scheduledTimes[times[2]].length > scheduledTimes[times[0]].length) {
                  scheduledTimes[times[0]].push(person);
              } else if (scheduledTimes[times[1]].length > scheduledTimes[times[2]].length || scheduledTimes[times[0]].length > scheduledTimes[times[2]].length) {
                  scheduledTimes[times[2]].push(person);
              } else if (scheduledTimes[times[2]].length > scheduledTimes[times[1]].length || scheduledTimes[times[0]].length > scheduledTimes[times[1]].length) {
                  scheduledTimes[times[1]].push(person);  
              } else {
                  scheduledTimes[times[0]].push(person);
              }
          });

             
          break;
      case('lunch'):
         
          times = ['11:30', '12:00'];
          scheduledTimes['11:30'] = [];
          scheduledTimes['12:00'] = [];

          for (let shadower in shadowPairs) {
              for (let j = 0; j < 1; j++) {
                  // alternate lists by checking if the counter is 0
                  if (counter === 0) {
                      scheduledTimes[times[0]].push(shadower);
                      scheduledTimes[times[0]].push(...shadowPairs[shadower]);
                      scheduledTimes[times[0]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });
                 
                      // increment counter by 1
                      counter ++;
                  } else {
                      scheduledTimes[times[1]].push(shadower);
                      scheduledTimes[times[1]].push(...shadowPairs[shadower]);
                     
                      scheduledTimes[times[1]].map (name => {
                          totalAttendance.forEach((person, index) => {
                              if (name === person) {
                                  totalAttendance.splice(index, 1);
                              }
                          });
                      });

                      // reset counter to 0    
                      counter = 0;
                  }
              }
          }
         
          // assign remaining names to fill in voids in the schedule even it out as best as possible
          totalAttendance.forEach(person => {
              if (scheduledTimes[times[0]].length > scheduledTimes[times[1]].length) {
                  scheduledTimes[times[1]].push(person);
              } else if (slotTwo = scheduledTimes[times[1]].length > scheduledTimes[times[0]].length) {
                  scheduledTimes[times[0]].push(person);
              } else {
                  scheduledTimes[times[0]].push(person);
              }
          });
 
          break;
  }

  return scheduledTimes;
};