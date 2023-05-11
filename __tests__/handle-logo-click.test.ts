import { act } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import useTeamSelector from '../useTeamSelector';
import { playersApi } from '../api/players';

jest.mock('../api/playersApi');

describe('useTeamSelector', () => {
  it('should fetch players by squad id and update state', async () => {
    const mockPlayers = [
      {
        playerId: '19545',
        name: 'Player One',
        stats: {
          score: 10,
        },
      },
      {
        playerId: '283',
        name: 'Player Two',
        stats: {
          score: 20,
        },
      },
    ];

    playersApi.getPlayersBySquadId.mockResolvedValueOnce({ data: { response: [{ players: mockPlayers, team: 'Arsenal' }] } });

    const { result, waitForNextUpdate } = renderHook(() => useTeamSelector());

    await act(async () => {
      await result.current.handleLogoClick('123');
      await waitForNextUpdate();
    });

    expect(result.current.selectedPlayers).toEqual(mockPlayers);
    expect(result.current.selectedTeam).toEqual('Arsenal');
  });
});
