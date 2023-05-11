import { leaguesApi } from 'api/leagues'

describe('leagues API', () => {
  it('should retrieve a list of leagues', async () => {
    const response = await leaguesApi.getLeagues();
    expect(response.status).toEqual(200);
    expect(response.data).toBeDefined();
    expect(response.data.api).toBeDefined();
    expect(response.data.api.leagues).toBeDefined();
    expect(response.data.api.leagues.length).toBeGreaterThan(0);
  });

  it('should retrieve a specific league by id', async () => {
    const response = await leaguesApi.getLeaguesByLeagueId('2');
    expect(response.status).toEqual(200);
    expect(response.data).toBeDefined();
    expect(response.data.api).toBeDefined();
    expect(response.data.api.leagues).toBeDefined();
    expect(response.data.api.leagues.length).toEqual(1);
    expect(response.data.api.leagues[0].league_id).toEqual('2');
  });
});