import { teamStatisticsApi } from '../api/teamStatistics'

describe('teamStatisticsApi', () => {
  describe('getTeamStatisticsById', () => {
    it('should return team statistics by team and league', async () => {
      const response = await teamStatisticsApi.getTeamStatisticsById('Arsenal', 'PL');
      expect(response.status).toEqual(200);
      expect(response.data.response.length).toBeGreaterThan(0);
      expect(response.data.response[0]).toHaveProperty('league');
      expect(response.data.response[0]).toHaveProperty('team');
    });
  });
});
