import { fetchStudentData } from '../../../util/student/fetchStudentData';

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
  jest.restoreAllMocks();
});

describe('fetchStudentData', () => {
  it('returns null when MOCK_USER_DATA_URL is not set', async () => {
    delete process.env.MOCK_USER_DATA_URL;
    const result = await fetchStudentData();
    expect(result).toBeNull();
  });

  it('returns null when fetch returns a non-ok status', async () => {
    process.env.MOCK_USER_DATA_URL = 'http://localhost:3002/data';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable'
    });
    const result = await fetchStudentData();
    expect(result).toBeNull();
  });

  it('returns null when fetch throws a network error', async () => {
    process.env.MOCK_USER_DATA_URL = 'http://localhost:3002/data';
    global.fetch = jest.fn().mockRejectedValue(new Error('ECONNREFUSED'));
    const result = await fetchStudentData();
    expect(result).toBeNull();
  });

  it('returns parsed JSON on success', async () => {
    process.env.MOCK_USER_DATA_URL = 'http://localhost:3002/data';
    const mockData = [{ id: '1', name: 'Student One' }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    });
    const result = await fetchStudentData();
    expect(result).toEqual(mockData);
  });
});
