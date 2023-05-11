import { teamsApi } from '../api/teams'

describe('getTeamsByLeagueId', () => {
  it('should return an array of teams', async () => {
    const response = await teamsApi.getTeamsByLeagueId("39");

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
