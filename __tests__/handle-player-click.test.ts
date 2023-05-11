import { renderHook } from '@testing-library/react-hooks';
import usePlayerData from '../usePlayerData';
import { playersStatisticsApi } from '../api/playersStatistics';

jest.mock('../api/playersStatistics');

describe('usePlayerData', () => {
  it('should fetch player data and set the player data and player data1', async () => {
    const mockPlayerData = {
      playerId: '19545',
      name: 'Player One',
      stats: {
        score: 10,
      },
    };
    const mockPlayerData1 = {
      playerId: '19545',
      data: {
        key: 'value',
      },
    };
    playersStatisticsApi.getStatisticsByPlayerId
      .mockResolvedValueOnce({ data: { response: mockPlayerData } })
      .mockResolvedValueOnce({ data: { response: { data: mockPlayerData1 } } });

    const { result, waitForNextUpdate } = renderHook(() => usePlayerData());

    await act(async () => {
      result.current.handlePlayerClick(19545);
      await waitForNextUpdate();
    });

    expect(result.current.playerData).toEqual(mockPlayerData);
    expect(result.current.playerData1).toEqual(mockPlayerData1);
    expect(result.current.isPlayStatModalOpen).toEqual(true);
  });
});
