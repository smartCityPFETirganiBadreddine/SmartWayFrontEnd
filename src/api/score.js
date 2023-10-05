import { instance } from "../config/api";

async function getAll(page, rowsPerPage) {
  const response = await instance.get(
    `/score/scores?pageNumber=${page}&pageSize=${rowsPerPage}`
  );
  return response;
}

// Delete score
export async function remove(id) {
  instance.delete(`/score/${id}`);
  console.log("inside the delete score", instance.delete(`/score/${id}`));
}
// score by Id
export async function getByUserId(id) {
  const response = await instance.get(`/score/getScorsByUserId/${id}`);
  console.log(
    "inside get score By Id function",
    await instance.get(`/score/getScorsByUserId/${id}`)
  );
  return response;
}

// Update score

export async function update(id, score) {
  const response = await instance.put(`/score/${id}`, score);
  try {
    return response.data;
  } catch (error) {
    return console.log("error update", error);
  }
}

/*
 "wordPerMinut": 0,
  "accuracy": 0,
  "testDate": "2023-03-14T13:25:02.735Z",
  "assignedUser": {
    "id": 1
  }*/
// Create score updated
export async function create(score, userId) {
  const data = {
    // map the properties of the score object to the properties of the ScoreDto object
    wordPerMinut: score.wordPerMinut,
    accuracy: score.accuracy,
    // set the userId property to the provided userId parameter
    testDate: score.testDate,
    assignedUser: {
      id: userId,
    },
  };

  try {
    const response = await instance.post("/score/", data);
    return response.data;
  } catch (error) {
    console.log("error create", error);
    throw error;
  }
}

// Assign score
export async function assignProject(scoreId, projectId) {
  const response = await instance.post(`/score/assign-project`, {
    scoreId,
    projectId,
  });
  try {
    return response;
  } catch (error) {
    return console.log("error assign", error);
  }
}

export { getAll as getscores, getByUserId as getscoreById };
