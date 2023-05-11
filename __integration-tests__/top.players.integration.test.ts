import { topPlayersApi } from '../api/topPlayers';

describe('getPlayerByTopStats', () => {
  it('should return player statistics for the specified league', async () => {
    const league = 'PL'; 
    const response = await topPlayersApi.getPlayerByTopStats(league);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.response).toBeDefined();
    expect(response.data.response.length).toBeGreaterThan(0);
    expect(response.data.response[0].league).toBe(league);
  });
});
