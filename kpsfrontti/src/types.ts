export interface GameHistoryType {
  stats: {
    winratio: string,
    total_matches_played: string,
    most_played_hand: string
  }
  games: Game[]
}

export interface Game {
  type: string,
  gameId: string,
  t: number,
  playerA: PlayerBoxProps
  playerB: PlayerBoxProps
}

export interface PlayerBoxProps {
  name: string,
  played?: string,
  winner?: string
}