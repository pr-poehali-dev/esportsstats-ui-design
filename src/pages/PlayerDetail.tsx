import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Match = {
  id: number;
  date: string;
  opponent: string;
  result: 'win' | 'loss';
  kills: number;
  deaths: number;
  assists: number;
  duration: string;
};

type PlayerStats = {
  id: number;
  name: string;
  team: string;
  region: string;
  kda: number;
  winrate: number;
  rating: number;
  kills: number;
  deaths: number;
  assists: number;
  gpm: number;
  totalMatches: number;
  wins: number;
  losses: number;
  avgMatchDuration: string;
  favoriteHero: string;
  recentMatches: Match[];
  kdaHistory: number[];
};

const mockPlayerData: Record<number, PlayerStats> = {
  1: {
    id: 1,
    name: 'ShadowKing',
    team: 'Team Liquid',
    region: 'EU',
    kda: 4.8,
    winrate: 68,
    rating: 9850,
    kills: 892,
    deaths: 186,
    assists: 1024,
    gpm: 645,
    totalMatches: 145,
    wins: 99,
    losses: 46,
    avgMatchDuration: '38:24',
    favoriteHero: 'Phantom Assassin',
    kdaHistory: [4.2, 4.5, 4.3, 4.6, 4.8, 5.0, 4.7, 4.9, 4.8, 5.1],
    recentMatches: [
      { id: 1, date: '23.12.2025', opponent: 'Team Spirit', result: 'win', kills: 12, deaths: 2, assists: 18, duration: '42:15' },
      { id: 2, date: '22.12.2025', opponent: 'OG Esports', result: 'win', kills: 15, deaths: 3, assists: 20, duration: '36:40' },
      { id: 3, date: '21.12.2025', opponent: 'Evil Geniuses', result: 'loss', kills: 8, deaths: 5, assists: 12, duration: '51:22' },
      { id: 4, date: '20.12.2025', opponent: 'PSG.LGD', result: 'win', kills: 14, deaths: 2, assists: 16, duration: '34:18' },
      { id: 5, date: '19.12.2025', opponent: 'Tundra', result: 'win', kills: 11, deaths: 4, assists: 19, duration: '45:30' },
    ]
  }
};

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = mockPlayerData[Number(id) || 1];

  if (!player) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Игрок не найден</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Вернуться к списку
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 animate-fade-in"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к таблице
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border animate-scale-in lg:col-span-1">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                  {player.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="Shield" size={16} className="text-muted-foreground" />
                <span className="text-lg text-muted-foreground">{player.team}</span>
              </div>
              <Badge className="bg-primary text-primary-foreground mb-6">
                <Icon name="Globe" size={14} className="mr-1" />
                {player.region}
              </Badge>

              <div className="space-y-4 mt-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Рейтинг</p>
                  <p className="text-4xl font-bold text-primary">{player.rating}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">K/D/A</p>
                    <p className="text-2xl font-bold">{player.kda}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Винрейт</p>
                    <p className="text-2xl font-bold text-success">{player.winrate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="BarChart3" size={24} className="text-primary" />
                Общая статистика
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Crosshair" size={16} className="text-destructive" />
                    <p className="text-sm text-muted-foreground">Убийства</p>
                  </div>
                  <p className="text-2xl font-bold">{player.kills}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Skull" size={16} className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Смерти</p>
                  </div>
                  <p className="text-2xl font-bold">{player.deaths}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Users" size={16} className="text-secondary" />
                    <p className="text-sm text-muted-foreground">Ассисты</p>
                  </div>
                  <p className="text-2xl font-bold">{player.assists}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Coins" size={16} className="text-yellow-500" />
                    <p className="text-sm text-muted-foreground">GPM</p>
                  </div>
                  <p className="text-2xl font-bold">{player.gpm}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Всего матчей</p>
                    <p className="text-xl font-bold">{player.totalMatches}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Победы / Поражения</p>
                    <p className="text-xl font-bold">
                      <span className="text-success">{player.wins}</span>
                      <span className="text-muted-foreground"> / </span>
                      <span className="text-destructive">{player.losses}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Средняя длительность</p>
                    <p className="text-xl font-bold">{player.avgMatchDuration}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} className="text-primary" />
                Динамика K/D/A
              </h2>
              <div className="h-48 flex items-end justify-between gap-2">
                {player.kdaHistory.map((value, index) => {
                  const maxValue = Math.max(...player.kdaHistory);
                  const height = (value / maxValue) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground">{value}</div>
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>10 матчей назад</span>
                <span>Последний матч</span>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="History" size={24} className="text-primary" />
                Последние матчи
              </h2>
              <div className="space-y-3">
                {player.recentMatches.map((match) => (
                  <div 
                    key={match.id}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-[1.02] cursor-pointer ${
                      match.result === 'win' 
                        ? 'border-success/30 bg-success/5' 
                        : 'border-destructive/30 bg-destructive/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className={match.result === 'win' ? 'bg-success' : 'bg-destructive'}>
                          {match.result === 'win' ? 'WIN' : 'LOSS'}
                        </Badge>
                        <div>
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-sm text-muted-foreground">{match.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden md:block">
                          <p className="text-sm text-muted-foreground">K/D/A</p>
                          <p className="font-bold">
                            {match.kills}/{match.deaths}/{match.assists}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">KDA</p>
                          <p className="font-bold text-primary">
                            {((match.kills + match.assists) / Math.max(match.deaths, 1)).toFixed(1)}
                          </p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-sm text-muted-foreground">Время</p>
                          <p className="font-bold">{match.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
