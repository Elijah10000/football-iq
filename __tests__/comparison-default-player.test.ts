import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import ComparisonFeature from '../components/ComparisionFeature';
import { playersStatisticsApi } from '../api/playersStatistics';

jest.mock('../api/playersStatistics');

describe('usePlayersComparison', () => {
  it('should fetch default players and set player one and player two to compare', async () => {
    const mockPlayerOne = {
      playerId: '19545',
      name: 'Player One',
      stats: {
        score: 10,
      },
    };
    const mockPlayerTwo = {
      playerId: '283',
      name: 'Player Two',
      stats: {
        score: 20,
      },
    };

    const mockGetStatisticsByPlayerId = jest.fn()
      .mockResolvedValueOnce({ data: { response: [mockPlayerOne] } })
      .mockResolvedValueOnce({ data: { response: [mockPlayerTwo] } });

    playersStatisticsApi.getStatisticsByPlayerId = mockGetStatisticsByPlayerId;

    const { result, waitForNextUpdate }: RenderHookResult<unknown, ReturnType<typeof ComparisonFeature>> = renderHook(() => ComparisonFeature());

    await waitForNextUpdate();

    expect(mockGetStatisticsByPlayerId).toHaveBeenCalledTimes(2);
    expect(result.current.playerOneToCompare).toEqual(mockPlayerOne);
    expect(result.current.playerTwoToCompare).toEqual(mockPlayerTwo);
  });
});
