/**
 * Fetches student data from the mock data URL
 * @returns {Promise<Array|null>} Array of student objects, or null if fetch failed
 *
 * NOTE: This is a mock data function used for testing.
 * In production, use FCC Proper API with fccProperUserIds.
 */
export async function fetchStudentData() {
  try {
    if (!process.env.MOCK_USER_DATA_URL) {
      console.warn('MOCK_USER_DATA_URL environment variable is not defined.');
      return null;
    }
    let data = await fetch(process.env.MOCK_USER_DATA_URL);
    if (!data.ok) {
      console.error(
        `Failed to fetch student data: ${data.status} ${data.statusText}`
      );
      return null;
    }
    return await data.json();
  } catch (error) {
    console.error(
      'Error fetching student data (mock-fcc-data server is likely down):',
      error.message || error
    );
    return null;
  }
}
