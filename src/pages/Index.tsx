import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Player = {
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
  trend: 'up' | 'down' | 'stable';
  rankChange: number;
};

const mockPlayers: Player[] = [
  { id: 1, name: 'ShadowKing', team: 'Team Liquid', region: 'EU', kda: 4.8, winrate: 68, rating: 9850, kills: 892, deaths: 186, assists: 1024, gpm: 645, trend: 'up', rankChange: 2 },
  { id: 2, name: 'PhoenixRise', team: 'OG Esports', region: 'EU', kda: 4.5, winrate: 65, rating: 9720, kills: 856, deaths: 190, assists: 998, gpm: 632, trend: 'stable', rankChange: 0 },
  { id: 3, name: 'ThunderStrike', team: 'Team Spirit', region: 'CIS', kda: 4.3, winrate: 63, rating: 9580, kills: 834, deaths: 194, assists: 945, gpm: 618, trend: 'up', rankChange: 1 },
  { id: 4, name: 'IceBreaker', team: 'Evil Geniuses', region: 'NA', kda: 4.1, winrate: 61, rating: 9420, kills: 812, deaths: 198, assists: 923, gpm: 605, trend: 'down', rankChange: -1 },
  { id: 5, name: 'DragonSlayer', team: 'PSG.LGD', region: 'CN', kda: 4.0, winrate: 60, rating: 9280, kills: 798, deaths: 200, assists: 902, gpm: 598, trend: 'up', rankChange: 3 },
  { id: 6, name: 'NightHunter', team: 'Tundra Esports', region: 'EU', kda: 3.9, winrate: 59, rating: 9150, kills: 776, deaths: 199, assists: 886, gpm: 587, trend: 'stable', rankChange: 0 },
  { id: 7, name: 'StormBringer', team: 'Fnatic', region: 'SEA', kda: 3.8, winrate: 58, rating: 9020, kills: 765, deaths: 201, assists: 869, gpm: 574, trend: 'down', rankChange: -2 },
  { id: 8, name: 'BladeRunner', team: 'T1', region: 'SEA', kda: 3.7, winrate: 57, rating: 8890, kills: 748, deaths: 202, assists: 856, gpm: 562, trend: 'up', rankChange: 1 },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<'rating' | 'kda' | 'winrate'>('rating');

  const sortedPlayers = [...mockPlayers].sort((a, b) => {
    if (selectedMetric === 'rating') return b.rating - a.rating;
    if (selectedMetric === 'kda') return b.kda - a.kda;
    return b.winrate - a.winrate;
  });

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <Icon name="TrendingUp" size={16} className="text-success" />;
    if (trend === 'down') return <Icon name="TrendingDown" size={16} className="text-destructive" />;
    return <Icon name="Minus" size={16} className="text-muted-foreground" />;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">🏆 1st</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400 text-black hover:bg-gray-500">🥈 2nd</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600 text-white hover:bg-amber-700">🥉 3rd</Badge>;
    return <Badge variant="outline" className="text-muted-foreground">#{rank}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Trophy" size={24} className="text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gradient">EsportsStats</h1>
            </div>
            <Button 
              onClick={() => navigate('/compare')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Icon name="GitCompare" size={20} className="mr-2" />
              Сравнить игроков
            </Button>
          </div>
          <p className="text-xl text-muted-foreground">Аналитика и рейтинги лучших игроков киберспорта</p>
        </header>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Card className="p-6 bg-card border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего игроков</p>
                  <p className="text-2xl font-bold">12,458</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Gamepad2" size={24} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Активных команд</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Матчей сегодня</p>
                  <p className="text-2xl font-bold">342</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="rating" className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
            <TabsTrigger value="rating" onClick={() => setSelectedMetric('rating')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Star" size={18} className="mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="kda" onClick={() => setSelectedMetric('kda')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Target" size={18} className="mr-2" />
              K/D/A
            </TabsTrigger>
            <TabsTrigger value="winrate" onClick={() => setSelectedMetric('winrate')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Винрейт
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedMetric} className="space-y-4">
            <div className="grid gap-4">
              {sortedPlayers.map((player, index) => (
                <Card 
                  key={player.id} 
                  onClick={() => navigate(`/player/${player.id}`)}
                  className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 min-w-[120px]">
                      {getRankBadge(index + 1)}
                      {player.rankChange !== 0 && (
                        <div className="flex items-center gap-1">
                          {player.rankChange > 0 ? (
                            <Icon name="ArrowUp" size={16} className="text-success" />
                          ) : (
                            <Icon name="ArrowDown" size={16} className="text-destructive" />
                          )}
                          <span className={`text-sm font-medium ${player.rankChange > 0 ? 'text-success' : 'text-destructive'}`}>
                            {Math.abs(player.rankChange)}
                          </span>
                        </div>
                      )}
                    </div>

                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold">
                        {player.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{player.name}</h3>
                        {getTrendIcon(player.trend)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Shield" size={14} />
                          {player.team}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Globe" size={14} />
                          {player.region}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:grid grid-cols-4 gap-6 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Рейтинг</p>
                        <p className="text-xl font-bold text-primary">{player.rating}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">K/D/A</p>
                        <p className="text-xl font-bold">{player.kda}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Винрейт</p>
                        <p className="text-xl font-bold text-success">{player.winrate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">GPM</p>
                        <p className="text-xl font-bold text-secondary">{player.gpm}</p>
                      </div>
                    </div>

                    <Icon name="ChevronRight" size={24} className="text-muted-foreground" />
                  </div>

                  <div className="md:hidden grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Рейтинг</p>
                      <p className="text-lg font-bold text-primary">{player.rating}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">K/D/A</p>
                      <p className="text-lg font-bold">{player.kda}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Винрейт</p>
                      <p className="text-lg font-bold text-success">{player.winrate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">GPM</p>
                      <p className="text-lg font-bold text-secondary">{player.gpm}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;