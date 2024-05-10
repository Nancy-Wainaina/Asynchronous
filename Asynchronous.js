// /Question 1
function delay(time) {
    let myPromise = new Promise(resolve => setTimeout(resolve, time));
    return myPromise
  }
  async function logMessageAfterDelay(message, delayTime) {
    await delay(delayTime);
    console.log(`Hello your alarm is delayed by ${delayTime} seconds`);
  }
  logMessageAfterDelay("Hello, world!", 2000/1000);
//Question 2
function getUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = { id, name: `Ella ${id}`, email: `ella${id}gmail.com` };
      resolve(userData);
    }, 1000);
  });
}
const userIds = [1, 2, 3];
async function fetchAndLogUserData(userIds) {
  for (const id of userIds) {
    try {
      const userData = await getUserData(id);
      console.log(`User Data for ID ${id}:`, userData);
    } catch (error) {
      console.error(`Failed to fetch data for ID ${id}:`, error);
    }
  }
}
fetchAndLogUserData(userIds);
//Question 3
let task = false;
async function performTask() {
  return new Promise((resolve, reject) => {
    if(task){
      resolve('task is successful')
  }
  else{
    reject('There is an error')
}
  })
}
function performTaskWithCustomMessage() {
  performTask()
    .then(() => {
      console.log("Task is successful");
    })
    .catch(() => {
      console.log("There's an error");
    });
}
performTaskWithCustomMessage();
//Question 4
function unstableTask(taskName, failureProbability) {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    if (randomNumber > failureProbability) {
      resolve(`${taskName} succeeded`);
    } else {
      reject(`${taskName} failed`);
    }
  });
}
async function executeWithRetry(taskName, retries, failureProbability) {
  for (let i = 1; i <= retries; i++) {
    try {
      await unstableTask(taskName, failureProbability);
      console.log(`${taskName} succeeded after ${i} attempt(s)`);
      return;
    } catch (error) {
      console.log(`${taskName} failed on attempt ${i}`);
      if (i === retries) {
        console.log(`${taskName} failed after ${i} attempts`);
      }
    }
  }
}
executeWithRetry("Task 1", 3, 0.3);