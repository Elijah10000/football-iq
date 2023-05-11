import { playersStatisticsApi } from '../api/playersStatistics'

describe('getStatisticsByPlayerId', () => {
  it('should return player statistics by id', async () => {
    const playerId = '123';
    const response = await playersStatisticsApi.getStatisticsByPlayerId(playerId);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.response).toBeDefined();
    expect(response.data.response[0].statistics[0]).toBeDefined();
    expect(response.data.response[0].statistics[0].games.appearences).toBeDefined();
  });
});
