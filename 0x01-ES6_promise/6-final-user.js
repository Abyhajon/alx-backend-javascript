// Importing functions from other files
import { signUpUser } from './4-user-promise.js';
import { uploadPhoto } from './5-photo-reject.js';

// Function to handle profile signup
export async function handleProfileSignup(firstName, lastName, fileName) {
  try {
    // Calling the signUpUser and uploadPhoto functions
    const userPromise = signUpUser(firstName, lastName);
    const photoPromise = uploadPhoto(fileName);

    // Waiting for both promises to settle (resolve or reject)
    const [userResult, photoResult] = await Promise.allSettled([userPromise, photoPromise]);

    // Returning the array with the required structure
    return [
      { status: userResult.status, value: userResult.status === 'fulfilled' ? userResult.value : userResult.reason },
      { status: photoResult.status, value: photoResult.status === 'fulfilled' ? photoResult.value : photoResult.reason }
    ];
  } catch (error) {
    // In case of any uncaught errors during the process
    console.error(error);
    throw error;
  }
}
