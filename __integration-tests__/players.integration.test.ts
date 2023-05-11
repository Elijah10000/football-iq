import { playersApi } from '../api/players'

describe('players API', () => {
  it('should retrieve a list of players by squad ID', async () => {
    const response = await playersApi.getPlayersBySquadId('squad_id_here');
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  });
});
