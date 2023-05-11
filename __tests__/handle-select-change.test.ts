import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import useTeamSelector from '../useTeamSelector';
import { teamsApi } from '../api/teams';

jest.mock('../api/teams');

describe('useTeamSelector', () => {
  it('should set teams and selected league when selecting a league', async () => {
    const mockTeams = [
      { id: 1, name: 'Team 1', leagueId: '1' },
      { id: 2, name: 'Team 2', leagueId: '1' },
    ];
    const mockResponse = { data: { response: mockTeams } };
    (teamsApi.getTeamsByLeagueId as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useTeamSelector());

    await act(async () => {
      await result.current.handleSelectChange('1');
      await waitForNextUpdate();
    });

    expect(result.current.teams).toEqual(mockTeams);
    expect(result.current.selectedLeague).toEqual('1');
    expect(result.current.selectedTeam).toBeUndefined();
  });
});
